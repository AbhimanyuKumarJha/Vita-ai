import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';
import app from '../src/server';
import { resetCatalog, resetDailyState, setMetrics } from '../src/services/state';
import { defaultMetrics } from '../src/data/seed';

process.env.NODE_ENV = 'test';

beforeEach(() => {
  resetCatalog();
  resetDailyState('2024-04-18T00:00:00');
  setMetrics({ ...defaultMetrics(), date: '2024-04-18' });
});

describe('Scenario acceptance tests', () => {
  it('Scenario A: returns deterministic ordering and scores', async () => {
    const response = await request(app)
      .get('/recommendations')
      .query({ timestamp: '2024-04-18T15:00:00' })
      .expect(200);

    const ids = response.body.tasks.map((entry: any) => entry.task.id);
    expect(ids).toEqual(['screen-break-10', 'water-500', 'steps-1k', 'mood-check-quick']);

    const scores = response.body.tasks.map((entry: any) => entry.score);
    expect(scores[0]).toBeCloseTo(1.8918, 4);
    expect(scores[1]).toBeCloseTo(1.6784, 4);
    expect(scores[2]).toBeCloseTo(1.6418, 4);
    expect(scores[3]).toBeCloseTo(1.3146, 4);
  });

  it('Scenario B: substitution shows micro task after dismissals', async () => {
  const dismissPayload = { taskId: 'water-500', timestamp: '2024-04-18T15:05:00' };
    await request(app).post('/actions/dismiss').send(dismissPayload).expect(200);
    await request(app)
      .post('/actions/dismiss')
  .send({ ...dismissPayload, timestamp: '2024-04-18T15:10:00' })
      .expect(200);
    await request(app)
      .post('/actions/dismiss')
  .send({ ...dismissPayload, timestamp: '2024-04-18T15:15:00' })
      .expect(200);

    const response = await request(app)
      .get('/recommendations')
  .query({ timestamp: '2024-04-18T15:20:00' })
      .expect(200);

    const ids = response.body.tasks.map((entry: any) => entry.task.id);
    expect(ids).toContain('water-250');
    const microEntry = response.body.tasks.find((entry: any) => entry.task.id === 'water-250');
    expect(microEntry.score).toBeCloseTo(1.3896, 4);
  });

  it('Scenario C: completion hides task for the rest of the day', async () => {
    await request(app)
      .post('/actions/complete')
  .send({ taskId: 'screen-break-10', timestamp: '2024-04-18T15:30:00' })
      .expect(200);

    const response = await request(app)
      .get('/recommendations')
  .query({ timestamp: '2024-04-18T15:35:00' })
      .expect(200);

    const ids = response.body.tasks.map((entry: any) => entry.task.id);
    expect(ids).not.toContain('screen-break-10');
  });

  it('Scenario D: time gating softens score until evening', async () => {
    setMetrics({ ...defaultMetrics(), sleepHours: 5 });
    const dayResponse = await request(app)
  .get('/recommendations')
  .query({ timestamp: '2024-04-18T15:00:00' })
      .expect(200);
    const eveningResponse = await request(app)
  .get('/recommendations')
  .query({ timestamp: '2024-04-18T20:00:00' })
      .expect(200);

    const dayRanked = dayResponse.body.debug.ranked;
    const eveningRanked = eveningResponse.body.debug.ranked;

    const daySleep = dayRanked.find((entry: any) => entry.task.id === 'sleep-winddown-15');
    const eveSleep = eveningRanked.find((entry: any) => entry.task.id === 'sleep-winddown-15');

    expect(daySleep.score).toBeLessThan(eveSleep.score);
    expect(daySleep.score).toBeCloseTo(0.8667, 3);
    expect(eveSleep.score).toBeCloseTo(2.1867, 3);
  });
});
