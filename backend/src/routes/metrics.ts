import { Router, type Request, type Response } from 'express';
import { ZodError, type ZodIssue } from 'zod';
import { metricsUpdateSchema } from '../utils/validation';
import { computeRecommendations, updateMetrics } from '../services/recommendationService';

const metricsRouter = Router();

metricsRouter.get('/', (_req: Request, res: Response) => {
  const recommendations = computeRecommendations();
  res.json({ metrics: recommendations.metrics });
});

metricsRouter.patch('/', (req: Request, res: Response) => {
  try {
    const parsed = metricsUpdateSchema.parse(req.body);
    const updatedMetrics = updateMetrics(parsed);
    const recommendations = computeRecommendations(parsed.timestamp);
    res.json({ metrics: updatedMetrics, recommendations });
  } catch (error) {
    if (error instanceof ZodError) {
      const zodError = error as ZodError;
      const message = zodError.issues.map((issue: ZodIssue) => issue.message).join(', ');
      res.status(400).json({ message });
      return;
    }
    res.status(400).json({ message: (error as Error).message });
  }
});

export default metricsRouter;
