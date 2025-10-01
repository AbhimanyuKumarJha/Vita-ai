import { useState, type ReactNode } from "react";
import { AppContext } from "./appContext";
import type { RecommendationTask, UserMetrics } from "../types";

// Create a provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Set up the same state that was previously managed by Recoil atoms
  const [loading, setLoading] = useState<boolean>(true);
  const [metrics, setMetrics] = useState<UserMetrics | null>(null);
  const [tasks, setTasks] = useState<RecommendationTask[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [journalDraft, setJournalDraft] = useState<string>("");
  const [journalEntries, setJournalEntries] = useState<string[]>([
    "I am feeling grateful for the life I have today.",
    "Need to remember to call Dadu this weekend.",
  ]);

  // Create the value object that will be provided to consumers
  const value = {
    loading,
    setLoading,
    metrics,
    setMetrics,
    tasks,
    setTasks,
    error,
    setError,
    journalDraft,
    setJournalDraft,
    journalEntries,
    setJournalEntries,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
