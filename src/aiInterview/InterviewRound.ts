import { z } from 'zod';

export enum RoundStatus {
  REJECTED = 'REJECTED',
  SELECTED = 'SELECTED',
}

export const InterviewRoundSchema = z.object({
  roundType: z.string().min(1, 'round type cannot be empty'),
  status: z.nativeEnum(RoundStatus),
  remarks: z.string().optional(),
});

export type InterviewRound = z.infer<typeof InterviewRoundSchema>;
