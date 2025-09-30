import { defaultMetrics, defaultWeights, seedTasks } from '../data/seed';
import {
  ActionType,
  RecommendationResult,
  TaskDefinition,
  TaskHistoryEntry,
  TaskState,
  TimeGate,
  UserMetrics
} from '../models/types';
import { resolveTimeContext } from '../utils/time';

interface AppState {
  tasks: Map<string, TaskState>;
  metrics: UserMetrics;
  history: TaskHistoryEntry[];
  lastResetDate: string;
  weights: typeof defaultWeights;
}

const toState = (definition: TaskDefinition): TaskState => ({
  ...definition,
  ignores: 0,
  completedToday: false
});

const initialMetrics = defaultMetrics();

const appState: AppState = {
  tasks: new Map(seedTasks.map((task) => [task.id, toState(task)])),
  metrics: initialMetrics,
  history: [],
  lastResetDate: initialMetrics.date,
  weights: defaultWeights
};

export function resetCatalog(tasks: TaskDefinition[] = seedTasks): void {
  appState.tasks = new Map(tasks.map((task) => [task.id, toState(task)]));
  appState.history = [];
}

export function getAllTasks(): TaskState[] {
  return Array.from(appState.tasks.values());
}

export function getTask(taskId: string): TaskState | undefined {
  return appState.tasks.get(taskId);
}

export function upsertTask(definition: TaskDefinition): TaskState {
  const existing = appState.tasks.get(definition.id);
  const next: TaskState = {
    ...definition,
    ignores: existing?.ignores ?? 0,
    completedToday: existing?.completedToday ?? false,
    lastDismissedAt: existing?.lastDismissedAt
  };
  appState.tasks.set(next.id, next);
  return next;
}

export function updateTask(task: TaskState): void {
  appState.tasks.set(task.id, task);
}

export function getMetrics(): UserMetrics {
  return appState.metrics;
}

export function setMetrics(partial: Partial<UserMetrics>): UserMetrics {
  appState.metrics = {
    ...appState.metrics,
    ...partial
  };
  return appState.metrics;
}

export function recordAction(action: TaskHistoryEntry): void {
  appState.history.push(action);
}

export function getHistory(): TaskHistoryEntry[] {
  return appState.history;
}

export function ensureDailyReset(timestamp?: string | number | Date): void {
  const context = resolveTimeContext(timestamp ?? new Date());
  if (context.dateKey === appState.lastResetDate) {
    return;
  }

  appState.tasks.forEach((task) => {
    task.ignores = 0;
    task.completedToday = false;
  });
  appState.metrics.date = context.dateKey;
  appState.lastResetDate = context.dateKey;
}

export function markCompleted(taskId: string, timestamp: string): TaskState | undefined {
  const task = appState.tasks.get(taskId);
  if (!task) return undefined;
  if (!task.completedToday) {
    task.completedToday = true;
    updateTask(task);
    recordAction({ taskId, type: 'complete', timestamp });
  }
  return task;
}

export function markDismissed(taskId: string, timestamp: string): TaskState | undefined {
  const task = appState.tasks.get(taskId);
  if (!task) return undefined;
  task.ignores += 1;
  task.lastDismissedAt = timestamp;
  updateTask(task);
  recordAction({ taskId, type: 'dismiss', timestamp });
  return task;
}

export function resetDailyState(timestamp?: string | number | Date): void {
  const context = resolveTimeContext(timestamp ?? new Date());
  appState.tasks.forEach((task) => {
    task.ignores = 0;
    task.completedToday = false;
  });
  appState.metrics = { ...defaultMetrics(), date: context.dateKey };
  appState.lastResetDate = context.dateKey;
  appState.history = [];
}

export function getWeights(): typeof defaultWeights {
  return appState.weights;
}

export function setWeights(updated: Partial<typeof defaultWeights>): void {
  appState.weights = { ...appState.weights, ...updated };
}
