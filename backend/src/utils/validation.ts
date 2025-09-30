import { z, type RefinementCtx } from 'zod';

export const actionSchema = z.object({
  taskId: z.string().min(1, 'taskId is required'),
  timestamp: z.string().optional()
});

export type ActionSchemaInput = z.infer<typeof actionSchema>;

const metricsBase = z.object({
  waterMl: z.number().nonnegative(),
  steps: z.number().nonnegative(),
  sleepHours: z.number().min(0),
  screenTimeMin: z.number().min(0),
  mood: z.number().min(1).max(5)
});

export const metricsUpdateSchema = metricsBase
  .partial()
  .extend({
    timestamp: z.string().optional()
  })
  .superRefine((data: Partial<z.infer<typeof metricsBase>> & { timestamp?: string }, ctx: RefinementCtx) => {
    const keys: Array<keyof typeof metricsBase.shape> = [
      'waterMl',
      'steps',
      'sleepHours',
      'screenTimeMin',
      'mood'
    ];
    const hasAtLeastOne = keys.some((key) => data[key] !== undefined);
    if (!hasAtLeastOne) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'At least one metric field must be supplied'
      });
    }
  });

export type MetricsUpdateInput = z.infer<typeof metricsUpdateSchema>;
