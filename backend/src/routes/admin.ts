import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { resetCatalog, resetDailyState, getAllTasks } from '../services/state';
import { seedTasks } from '../data/seed';
import { computeRecommendations } from '../services/recommendationService';

const adminRouter = Router();

const seedSchema = z.object({
  tasks: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        category: z.string(),
        impactWeight: z.number(),
        effortMinutes: z.number(),
        timeGate: z.enum(['morning', 'day', 'evening']).optional(),
        microAlt: z.string().optional()
      })
    )
    .optional()
});

adminRouter.post('/seed', (req: Request, res: Response) => {
  const parsed = seedSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ message: parsed.error.message });
    return;
  }

  const tasks = parsed.data.tasks ?? seedTasks;
  resetCatalog(tasks);
  resetDailyState();
  res.json({ message: 'Seeded tasks', tasks: getAllTasks() });
});

adminRouter.post('/reset', (_req: Request, res: Response) => {
  resetDailyState();
  const recommendations = computeRecommendations();
  res.json({ message: 'Daily state reset', recommendations });
});

adminRouter.get('/tasks', (_req: Request, res: Response) => {
  res.json({ tasks: getAllTasks() });
});

export default adminRouter;
