// DEPRECATED: This file is no longer used. We've migrated from Recoil to React Context API.
// See the following files for the new implementation:
// - appContext.ts: Defines the context type
// - AppProvider.tsx: Provides the state to the application
// - useAppState.ts: Custom hook to consume the context

import type { RecommendationTask, UserMetrics } from '../types';

// These are kept as types for documentation purposes, but are no longer used
export type LoadingState = boolean;
export type MetricsState = UserMetrics | null;
export type TasksState = RecommendationTask[];
export type ErrorState = string | null;
export type JournalDraftState = string;
export type JournalEntriesState = string[];
