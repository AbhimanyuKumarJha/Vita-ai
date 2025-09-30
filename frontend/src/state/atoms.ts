import { atom } from 'recoil';
import type { RecommendationTask, UserMetrics } from '../types';

export const loadingAtom = atom<boolean>({
  key: 'loadingAtom',
  default: true
});

export const metricsAtom = atom<UserMetrics | null>({
  key: 'metricsAtom',
  default: null
});

export const tasksAtom = atom<RecommendationTask[]>({
  key: 'tasksAtom',
  default: []
});

export const errorAtom = atom<string | null>({
  key: 'errorAtom',
  default: null
});

export const journalDraftAtom = atom<string>({
  key: 'journalDraftAtom',
  default: ''
});

export const journalEntriesAtom = atom<string[]>({
  key: 'journalEntriesAtom',
  default: [
    'I am feeling grateful for the life I have today.',
    'Need to remember to call Dadu this weekend.'
  ]
});
