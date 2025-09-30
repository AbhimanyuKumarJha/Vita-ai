import { defaultWeights } from '../data/seed';
import {
  RecommendationResult,
  TaskState,
  TimeGate,
  UserMetrics
} from '../models/types';
import { timeOfDayFactor } from '../utils/time';

export interface ScoreBreakdown {
  urgency: number;
  impact: number;
  effort: number;
  timeOfDay: number;
  penalty: number;
  total: number;
}

interface ComputeOptions {
  metrics: UserMetrics;
  tasks: TaskState[];
  contextGate: TimeGate;
  excludeTaskIds?: Set<string>;
}

const MICRO_PARENT_LOOKUP = new Map<string, string>();

function rebuildMicroLookup(tasks: TaskState[]): void {
  MICRO_PARENT_LOOKUP.clear();
  tasks.forEach((task) => {
    if (task.microAlt) {
      MICRO_PARENT_LOOKUP.set(task.microAlt, task.id);
    }
  });
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function urgencyContribution(task: TaskState, metrics: UserMetrics): number {
  switch (task.category) {
    case 'hydration': {
      const remaining = Math.max(0, 2000 - metrics.waterMl);
      return clamp01(remaining / 2000);
    }
    case 'movement': {
      const remaining = Math.max(0, 8000 - metrics.steps);
      return clamp01(remaining / 8000);
    }
    case 'sleep':
      return metrics.sleepHours < 7 ? 1 : 0;
    case 'screen':
      return metrics.screenTimeMin >= 120 ? 1 : 0;
    case 'mood':
      return metrics.mood <= 2 ? 1 : 0.3;
    default:
      return 0.5;
  }
}

export function inverseEffort(minutes: number): number {
  return 1 / Math.log2(minutes + 2);
}

function computeScore(
  task: TaskState,
  metrics: UserMetrics,
  contextGate: TimeGate,
  ignoreCount: number
) {
  const weights = defaultWeights;
  const urgency = urgencyContribution(task, metrics);
  const timeFactor = timeOfDayFactor(task.timeGate, contextGate);
  const impact = task.timeGate ? task.impactWeight * timeFactor : task.impactWeight;
  const effort = inverseEffort(task.effortMinutes);
  const penalty = ignoreCount;

  const total =
    weights.urgency * urgency +
    weights.impact * impact +
    weights.effort * effort +
    weights.timeOfDay * timeFactor +
    weights.penalty * penalty;

  return {
    breakdown: {
      urgency,
      impact,
      effort,
      timeOfDay: timeFactor,
      penalty,
      total
    },
    score: total
  };
}

function buildRationale(task: TaskState, metrics: UserMetrics, breakdown: ScoreBreakdown): string {
  switch (task.category) {
    case 'hydration': {
      const remaining = Math.max(0, 2000 - metrics.waterMl);
      return `Hydration deficit ${remaining}ml, effort boost ${breakdown.effort.toFixed(2)}, time factor ${breakdown.timeOfDay.toFixed(1)}`;
    }
    case 'movement': {
      const remaining = Math.max(0, 8000 - metrics.steps);
      return `Movement gap ${remaining} steps, effort boost ${breakdown.effort.toFixed(2)}, urgency ${breakdown.urgency.toFixed(2)}`;
    }
    case 'sleep':
      return `Sleep logged ${metrics.sleepHours}h today, urgency ${breakdown.urgency.toFixed(2)}, time factor ${breakdown.timeOfDay.toFixed(1)}`;
    case 'screen':
      return `Screen time ${metrics.screenTimeMin} min, urgency ${breakdown.urgency.toFixed(2)} ignores ${breakdown.penalty.toFixed(0)}`;
    case 'mood':
      return `Mood score ${metrics.mood}/5, quick win effort ${breakdown.effort.toFixed(2)}`;
    default:
      return `Weighted score ${breakdown.total.toFixed(4)} from urgency ${breakdown.urgency.toFixed(2)}`;
  }
}

function shouldSkipTask(task: TaskState): boolean {
  return MICRO_PARENT_LOOKUP.has(task.id);
}

export function rankTasks({ metrics, tasks, contextGate, excludeTaskIds }: ComputeOptions): RecommendationResult[] {
  rebuildMicroLookup(tasks);
  const candidates: RecommendationResult[] = [];

  tasks.forEach((task) => {
    if (excludeTaskIds?.has(task.id)) {
      return;
    }

    if (task.completedToday) {
      return;
    }

    if (shouldSkipTask(task) && task.ignores === 0) {
      return;
    }

    let candidateTask = task;
    let isSubstitution = false;

    if (task.microAlt && task.ignores >= 3) {
      const micro = tasks.find((t) => t.id === task.microAlt);
      if (micro) {
        if (excludeTaskIds?.has(micro.id)) {
          return;
        }
        candidateTask = micro;
        isSubstitution = true;
      }
    }

    if (candidateTask.completedToday) {
      return;
    }

  const ignoreCount = isSubstitution ? 0 : candidateTask.ignores;
  const { breakdown, score } = computeScore(candidateTask, metrics, contextGate, ignoreCount);

    candidates.push({
      task: { ...candidateTask },
      score: parseFloat(score.toFixed(4)),
      rationale: buildRationale(candidateTask, metrics, breakdown),
      isSubstitution
    });
  });

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.task.impactWeight !== a.task.impactWeight) {
      return b.task.impactWeight - a.task.impactWeight;
    }
    if (a.task.effortMinutes !== b.task.effortMinutes) {
      return a.task.effortMinutes - b.task.effortMinutes;
    }
    return a.task.id.localeCompare(b.task.id);
  });

  return candidates;
}
