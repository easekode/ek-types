import { z } from 'zod'
import { JobSchema } from './Job'
import { CandidateSchema } from './Candidate'
import { QuestionAnswerSchema } from './QuestionAnswer'
import { Types } from 'mongoose'
import { InvitationStatus } from '../invitation'
import { DateObjOrString } from '../common'

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
 startTime: DateObjOrString.optional(),
 endTime: DateObjOrString.optional(),
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

export const SelfScheduleInterviewSchema = z.object({
 action: z.enum([InvitationStatus.ACCEPTED, InvitationStatus.REJECTED]),
 invitationCode: z.string(),
 scheduleTime: DateObjOrString,
 resumeUrl: z.string().url(),
 expInYrs: z.number().min(1),
 lastWorkingDay: DateObjOrString
})

export type SelfScheduleInterview = z.infer<typeof SelfScheduleInterviewSchema>

const InterviewFilterSchema = InterviewSchema.pick({
 status: true,
 type: true,
 startTime: true
})
 .partial()
 .extend({
  endTime: DateObjOrString.optional()
 })

export type InterviewFilter = z.infer<typeof InterviewFilterSchema>
