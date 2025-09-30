export type TimeGate = 'morning' | 'day' | 'evening' | 'all';

export interface TaskState {
  id: string;
  title: string;
  category: string;
  impactWeight: number;
  effortMinutes: number;
  timeGate?: TimeGate;
  microAlt?: string;
  ignores: number;
  completedToday: boolean;
}

export interface RecommendationTask {
  task: TaskState;
  score: number;
  rationale: string;
  isSubstitution: boolean;
}

export interface UserMetrics {
  date: string;
  waterMl: number;
  steps: number;
  sleepHours: number;
  screenTimeMin: number;
  mood: number;
}

export interface RecommendationResponse {
  generatedAt: string;
  timeWindow: TimeGate;
  metrics: UserMetrics;
  tasks: RecommendationTask[];
  debug?: {
    ranked: RecommendationTask[];
  };
}
