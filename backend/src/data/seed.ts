import { EngineWeights, TaskDefinition, UserMetrics } from '../models/types';

export const defaultWeights: EngineWeights = {
  urgency: 0.5,
  impact: 0.3,
  effort: 0.15,
  timeOfDay: 0.15,
  penalty: -0.2
};

export const seedTasks: TaskDefinition[] = [
  {
    id: 'water-500',
    title: 'Drink 500 ml water',
    category: 'hydration',
    impactWeight: 4,
    effortMinutes: 5,
    microAlt: 'water-250'
  },
  {
    id: 'water-250',
    title: 'Drink 250 ml water',
    category: 'hydration',
    impactWeight: 3,
    effortMinutes: 3
  },
  {
    id: 'steps-1k',
    title: 'Walk 1,000 steps',
    category: 'movement',
    impactWeight: 4,
    effortMinutes: 10,
    microAlt: 'steps-300'
  },
  {
    id: 'steps-300',
    title: 'Walk 300 steps (indoors ok)',
    category: 'movement',
    impactWeight: 3,
    effortMinutes: 5
  },
  {
    id: 'screen-break-10',
    title: 'Take a 10-min screen break',
    category: 'screen',
    impactWeight: 4,
    effortMinutes: 10
  },
  {
    id: 'sleep-winddown-15',
    title: '15-min wind-down routine',
    category: 'sleep',
    impactWeight: 5,
    effortMinutes: 15,
    timeGate: 'evening'
  },
  {
    id: 'mood-check-quick',
    title: 'Quick mood check-in',
    category: 'mood',
    impactWeight: 2,
    effortMinutes: 3
  }
];

export const defaultMetrics = (): UserMetrics => {
  const today = new Date();
  const ymd = today.toISOString().split('T')[0];
  return {
    date: ymd,
    waterMl: 900,
    steps: 4000,
    sleepHours: 6,
    screenTimeMin: 150,
    mood: 2
  };
};
