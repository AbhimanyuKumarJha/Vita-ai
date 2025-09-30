import {
  ensureDailyReset,
  getAllTasks,
  getMetrics,
  markCompleted,
  markDismissed,
  recordAction,
  setMetrics
} from './state';
import { rankTasks } from './engine';
import {
  ActionPayload,
  RecommendationResponse,
  TaskHistoryEntry,
  UserMetrics
} from '../models/types';
import { resolveTimeContext } from '../utils/time';

export function computeRecommendations(timestamp?: string | number | Date): RecommendationResponse {
  ensureDailyReset(timestamp);
  const context = resolveTimeContext(timestamp ?? new Date());
  const metrics = getMetrics();
  const tasks = getAllTasks();

  const ranked = rankTasks({
    metrics,
    tasks,
    contextGate: context.timeGate
  });

  return {
    generatedAt: context.iso,
    timeWindow: context.timeGate,
    metrics,
    tasks: ranked.slice(0, 4),
    debug: { ranked }
  };
}

export function computeRecommendationsExcluding(
  excluded: string[],
  timestamp?: string | number | Date
): RecommendationResponse {
  ensureDailyReset(timestamp);
  const context = resolveTimeContext(timestamp ?? new Date());
  const metrics = getMetrics();
  const tasks = getAllTasks();

  const ranked = rankTasks({
    metrics,
    tasks,
    contextGate: context.timeGate,
    excludeTaskIds: new Set(excluded)
  });

  return {
    generatedAt: context.iso,
    timeWindow: context.timeGate,
    metrics,
    tasks: ranked.slice(0, 4),
    debug: { ranked }
  };
}

export function completeTask(payload: ActionPayload, timestamp?: string): RecommendationResponse {
  const context = resolveTimeContext(timestamp ?? new Date());
  const completed = markCompleted(payload.taskId, context.iso);
  if (!completed) {
    throw new Error('Task not found');
  }
  return computeRecommendations(context.iso);
}

export function dismissTask(payload: ActionPayload, timestamp?: string): RecommendationResponse {
  const context = resolveTimeContext(timestamp ?? new Date());
  const dismissed = markDismissed(payload.taskId, context.iso);
  if (!dismissed) {
    throw new Error('Task not found');
  }
  return computeRecommendationsExcluding([payload.taskId], context.iso);
}

export function updateMetrics(metrics: Partial<UserMetrics>): UserMetrics {
  return setMetrics(metrics);
}

export function recordHistory(entry: TaskHistoryEntry): void {
  recordAction(entry);
}
