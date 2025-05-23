import { z } from 'zod'
import { JobSchema } from './Job'
import { CandidateSchema } from './Candidate'
import { QuestionAnswerSchema } from './QuestionAnswer'
import { Types } from 'mongoose'
import { InvitationStatus } from '../invitation'
import { DateObjOrString, ObjectIdOrStringId } from '../common'
import { TransformedUser } from '../user'
import { InterviewInstructions } from './instruction'
import { Document } from 'mongoose'
import { ConvHistorySchema } from './ConvHistory'
import { RescheduleHistorySchema } from './RescheduleHistory'

export enum InterviewType {
 MOCK = 'MOCK',
 REAL = 'REAL'
}

export enum InterviewStatus {
 PENDING = 'PENDING',
 SCHEDULED = 'SCHEDULED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED',
 TIME_OUT = 'TIME_OUT'
}

export enum TranscriptionStatus {
 PENDING = 'PENDING',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 FAILED = 'FAILED'
}

export enum EvaluationStatus {
 PENDING = 'PENDING',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 FAILED = 'FAILED'
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
 providedAnswer: z.array(QuestionAnswerSchema).optional(),
 companyId: ObjectIdOrStringId,
 convHistory: z.array(ConvHistorySchema).optional(),
 evalResult: z.string().optional(),
 transStatus: z.nativeEnum(TranscriptionStatus).optional(),
 evalStatus: z.nativeEnum(EvaluationStatus).optional(),
 cancelledReason: z.string().optional(),
 rescheduleReason: z.string().optional(),
 rescheduleHistory: z.array(RescheduleHistorySchema).optional(),
 startTimeUpdatedAt: DateObjOrString.optional()
})

export const UpdateInterviewSchema = InterviewSchema.omit({
 candidateId: true,
 job: true,
 companyId: true
}).partial()
export type Interview<T = unknown> = z.infer<typeof InterviewSchema> & { evalResultObj: T } & Document

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

export interface InterviewInfo {
 user: TransformedUser
 interview: Interview
 instruction: InterviewInstructions
}

export const SelfUpdateInterviewSchema = SelfScheduleInterviewSchema.pick({
 scheduleTime: true
})
 .extend({
  rescheduleReason: z.string().optional()
 })
 .strict()

export type SelfUpdateInterview = z.infer<typeof SelfUpdateInterviewSchema>