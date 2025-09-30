import { Router, type Request, type Response } from 'express';
import { computeRecommendations } from '../services/recommendationService';

const recommendationsRouter = Router();

recommendationsRouter.get('/', (req: Request, res: Response) => {
  const { timestamp } = req.query;
  try {
    const response = computeRecommendations(timestamp as string | undefined);
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default recommendationsRouter;
