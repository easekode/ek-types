import { z } from 'zod'
import { ConvHistorySchema } from './ConvHistory'

export enum InterviewSessionStatus {
 ACTIVE = 'ACTIVE',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export const InterviewSessionSchema = z.object({
 interviewId: z.string(),
 status: z.nativeEnum(InterviewSessionStatus).optional(),
 conversation: z.array(ConvHistorySchema).optional(),
 createdAt: z.string().optional(),
 updatedAt: z.string().optional()
})

export type InterviewSession = z.infer<typeof InterviewSessionSchema>
