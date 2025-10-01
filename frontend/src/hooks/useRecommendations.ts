import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import type { RecommendationResponse } from '../types';
import { useAppState } from '../state/useAppState';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const nowLocalIso = () => new Date().toISOString().slice(0, 19);

export const useRecommendations = () => {
  const { tasks, setTasks, loading, setLoading, setMetrics, error, setError } = useAppState();

  const applyResponse = useCallback(
    (data: RecommendationResponse) => {
      setTasks(data.tasks);
      setMetrics(data.metrics);
      setError(null);
    },
    [setMetrics, setTasks, setError]
  );

  const fetchRecommendations = useCallback(
    async (timestamp?: string) => {
      setLoading(true);
      try {
        const response = await client.get<RecommendationResponse>('/recommendations', {
          params: { timestamp: timestamp ?? nowLocalIso() }
        });
        applyResponse(response.data);
      } catch (error) {
        console.error('Failed to fetch recommendations', error);
        setError('Unable to fetch recommendations. Please try again shortly.');
      } finally {
        setLoading(false);
      }
    },
    [applyResponse, setError, setLoading]
  );

  const completeTask = useCallback(
    async (taskId: string) => {
      setLoading(true);
      try {
        const response = await client.post<RecommendationResponse>('/actions/complete', {
          taskId,
          timestamp: nowLocalIso()
        });
        applyResponse(response.data);
      } catch (error) {
        console.error('Failed to complete task', error);
        setError('Unable to complete the task right now.');
      } finally {
        setLoading(false);
      }
    },
    [applyResponse, setError, setLoading]
  );

  const dismissTask = useCallback(
    async (taskId: string) => {
      setLoading(true);
      try {
        const response = await client.post<RecommendationResponse>('/actions/dismiss', {
          taskId,
          timestamp: nowLocalIso()
        });
        applyResponse(response.data);
      } catch (error) {
        console.error('Failed to dismiss task', error);
        setError('Unable to dismiss the task.');
      } finally {
        setLoading(false);
      }
    },
    [applyResponse, setError, setLoading]
  );

  useEffect(() => {
    if (tasks.length === 0) {
      void fetchRecommendations();
    }
  }, [fetchRecommendations, tasks.length]);

  return {
    tasks,
    loading,
    refresh: fetchRecommendations,
    completeTask,
    dismissTask
  };
};
