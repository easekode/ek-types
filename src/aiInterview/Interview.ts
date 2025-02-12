import { z } from 'zod'
import { JobSchema } from './Job'
import { CandidateSchema } from './Candidate'
import { QuestionAnswerSchema } from './QuestionAnswer'
import { Types } from 'mongoose'

export enum InterviewType {
 MOCK = 'MOCK',
 REAL = 'REAL'
}

export enum InterviewStatus {
 PENDING = 'PENDING',
 SCHEDULED = 'SCHEDULED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export const InterviewSchema = z.object({
 candidateId: z.union([
  z.instanceof(Types.ObjectId),
  z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
   message: 'Invalid candidate id'
  })
 ]),
 candidate: CandidateSchema.optional(),
 jobId: z.union([
  z.instanceof(Types.ObjectId),
  z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
   message: 'Invalid job id'
  })
 ]),
 job: JobSchema.optional(),
 type: z.nativeEnum(InterviewType),
 duration: z.number().min(1, 'Duration must be at least 1 minute'),
 score: z.number().min(0).max(100).optional(),
 status: z.nativeEnum(InterviewStatus),
 startTime: z.date().optional(),
 endTime: z.date().optional(),
 feedback: z.string().optional(),
 examId: z.union([
  z.instanceof(Types.ObjectId),
  z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
   message: 'Invalid id examId'
  })
 ]),
 providedAnswer: z.array(QuestionAnswerSchema).optional()
})

export const UpdateInterviewSchema = InterviewSchema.partial()
export type Interview = z.infer<typeof InterviewSchema>
