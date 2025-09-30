import { Router, type Request, type Response } from 'express';
import { ZodError, type ZodIssue } from 'zod';
import { actionSchema } from '../utils/validation';
import { completeTask, dismissTask } from '../services/recommendationService';

const actionsRouter = Router();

function parseActionBody(req: Request) {
  const parsed = actionSchema.safeParse(req.body);
  if (!parsed.success) {
    throw parsed.error;
  }
  return parsed.data;
}

actionsRouter.post('/complete', (req: Request, res: Response) => {
  try {
    const data = parseActionBody(req);
    const response = completeTask({ taskId: data.taskId }, data.timestamp);
    res.json(response);
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

actionsRouter.post('/dismiss', (req: Request, res: Response) => {
  try {
    const data = parseActionBody(req);
    const response = dismissTask({ taskId: data.taskId }, data.timestamp);
    res.json(response);
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

export default actionsRouter;
