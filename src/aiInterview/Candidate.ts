import { z } from 'zod'
import { ObjectIdOrStringId } from '../common'
import { ProfileSource } from './ProfileSource'
import { CallStatus } from './Call'
import { IUserSchema } from '../user'
import { JobSchema } from './Job'

export enum CandidateStatus {
 PENDING = 'PENDING',
 UNDER_REVIEW = 'UNDER_REVIEW',
 FOLLOW_UP = 'FOLLOW_UP',
 SELECTED = 'SELECTED',
 PENDING_REVIEW = 'PENDING_REVIEW',
 REJECTED = 'REJECTED'
}

export const CandidateSchema = z.object({
 userId: ObjectIdOrStringId,
 user: IUserSchema.optional(),
 resumeUrl: z.string().url(),
 workExperience: z
  .array(
   z.object({
    company: z.string().min(1),
    role: z.string().min(1),
    startDate: z.date(),
    endDate: z.date().optional()
   })
  )
  .optional(),
 expInYrs: z.number().optional(),
 lastWorkingDay: z.date().optional(),
 source: z.nativeEnum(ProfileSource),
 status: z.nativeEnum(CandidateStatus),
 callStatus: z.nativeEnum(CallStatus),
 contactedOn: z.date()
})

export const UpdateCandidateSchema = CandidateSchema.partial()

export type NewCandidate = z.infer<typeof CandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>

export const CandidateJobInviteSchema = z.object({
 jobId: ObjectIdOrStringId,
 job: JobSchema.optional(),
 userIds: z.array(ObjectIdOrStringId).min(1),
 users: z.array(IUserSchema).optional()
})

export type CandidateJobInvite = z.infer<typeof CandidateJobInviteSchema>
