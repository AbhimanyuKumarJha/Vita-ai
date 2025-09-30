import express, { type Request, type Response } from 'express';
import cors from 'cors';
import recommendationsRouter from './routes/recommendations';
import actionsRouter from './routes/actions';
import metricsRouter from './routes/metrics';
import adminRouter from './routes/admin';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/recommendations', recommendationsRouter);
app.use('/actions', actionsRouter);
app.use('/metrics', metricsRouter);
app.use('/admin', adminRouter);

const port = Number(process.env.PORT ?? 4000);

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Vita AI backend listening on port ${port}`);
  });
}

export default app;
