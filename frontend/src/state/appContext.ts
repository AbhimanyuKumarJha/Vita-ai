import { createContext } from 'react';
import type { RecommendationTask, UserMetrics } from '../types';

// Define the type for our application state
export interface AppState {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  metrics: UserMetrics | null;
  setMetrics: (metrics: UserMetrics | null) => void;
  tasks: RecommendationTask[];
  setTasks: (tasks: RecommendationTask[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  journalDraft: string;
  setJournalDraft: (draft: string) => void;
  journalEntries: string[];
  setJournalEntries: (entries: string[]) => void;
}

// Create context with a default value
export const AppContext = createContext<AppState | undefined>(undefined);