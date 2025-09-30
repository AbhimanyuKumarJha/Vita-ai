import { describe, expect, it } from 'vitest';
import { inverseEffort, urgencyContribution } from '../src/services/engine';
import { defaultMetrics, seedTasks } from '../src/data/seed';

const hydrationTask = seedTasks.find((task) => task.id === 'water-500');
const movementTask = seedTasks.find((task) => task.id === 'steps-1k');

if (!hydrationTask || !movementTask) {
  throw new Error('Seed tasks missing hydration or movement definitions');
}

describe('inverseEffort', () => {
  it('computes expected inverse effort values', () => {
    expect(inverseEffort(3)).toBeCloseTo(0.4307, 4);
    expect(inverseEffort(5)).toBeCloseTo(0.3562, 4);
    expect(inverseEffort(10)).toBeCloseTo(0.2789, 4);
    expect(inverseEffort(15)).toBeCloseTo(0.2447, 4);
  });
});

describe('urgencyContribution', () => {
  it('ramps hydration urgency at the goal boundary', () => {
    const metricsBelow = { ...defaultMetrics(), waterMl: 500 };
    const metricsAtGoal = { ...defaultMetrics(), waterMl: 2000 };

    expect(urgencyContribution({ ...hydrationTask, ignores: 0, completedToday: false }, metricsBelow)).toBeCloseTo(
      0.75,
      2
    );
    expect(urgencyContribution({ ...hydrationTask, ignores: 0, completedToday: false }, metricsAtGoal)).toBe(0);
  });

  it('ramps movement urgency at the goal boundary', () => {
    const metricsBelow = { ...defaultMetrics(), steps: 4000 };
    const metricsAtGoal = { ...defaultMetrics(), steps: 8000 };

    expect(urgencyContribution({ ...movementTask, ignores: 0, completedToday: false }, metricsBelow)).toBeCloseTo(
      0.5,
      1
    );
    expect(urgencyContribution({ ...movementTask, ignores: 0, completedToday: false }, metricsAtGoal)).toBe(0);
  });
});
