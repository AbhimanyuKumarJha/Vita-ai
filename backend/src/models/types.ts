export type TimeGate = 'morning' | 'day' | 'evening';

export type TaskCategory =
  | 'hydration'
  | 'movement'
  | 'sleep'
  | 'screen'
  | 'mood'
  | (string & {});

export interface TaskDefinition {
  id: string;
  title: string;
  category: TaskCategory;
  impactWeight: number;
  effortMinutes: number;
  timeGate?: TimeGate;
  microAlt?: string;
}

export interface TaskState extends TaskDefinition {
  ignores: number;
  completedToday: boolean;
  lastDismissedAt?: string;
}

export interface UserMetrics {
  date: string; // ISO string representing current local day boundary
  waterMl: number;
  steps: number;
  sleepHours: number;
  screenTimeMin: number;
  mood: number; // 1-5
}

export interface EngineWeights {
  urgency: number;
  impact: number;
  effort: number;
  timeOfDay: number;
  penalty: number;
}

export interface RecommendationResult {
  task: TaskState;
  score: number;
  rationale: string;
  isSubstitution: boolean;
}

export interface RecommendationResponse {
  generatedAt: string;
  timeWindow: TimeGate | 'all';
  metrics: UserMetrics;
  tasks: RecommendationResult[];
  debug?: {
    ranked: RecommendationResult[];
  };
}

export interface ActionPayload {
  taskId: string;
}

export type ActionType = 'complete' | 'dismiss';

export interface TaskHistoryEntry {
  taskId: string;
  type: ActionType;
  timestamp: string;
}
