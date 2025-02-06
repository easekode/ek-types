import { z } from 'zod';

export const JobSchema = z.object({
  title: z.string(),
  expYears: z.number(),
  jobDescription: z.string(),
  numberOfQuestionSet: z.number(),
  examIds: z.array(z.string().refine(id => id.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid  id examIds',
  })),
  createdBy: z.string().refine(id => id.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid id createdBy',
  }),
  updatedBy: z.string().refine(id => id.match(/^[0-9a-fA-F]{24}$/), {
    message: 'Invalid id updatedBy',
  }),
});

export const updateJobSchema = JobSchema.partial();

export type Job = z.infer<typeof JobSchema>;
export type NewJob = z.infer<typeof JobSchema>;
export type UpdateJob = z.infer<typeof updateJobSchema>;