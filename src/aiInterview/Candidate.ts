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

export const CandidateSchema = z
 .object({
  userId: ObjectIdOrStringId,
  user: IUserSchema.optional(),
  resumeUrl: z.string().url(),
  workExperience: z
   .array(
    z.object({
     company: z.string().min(1),
     role: z.string().min(1),
     startDate: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
     endDate: z.preprocess(
      (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
      z.date().optional()
     )
    })
   )
   .optional(),
  expInYrs: z.number().optional(),
  lastWorkingDay: z.preprocess(
   (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
   z.date().optional()
  ),
  source: z.nativeEnum(ProfileSource).optional(),
  status: z.nativeEnum(CandidateStatus).optional(),
  callStatus: z.nativeEnum(CallStatus).optional(),
  contactedOn: z.preprocess(
   (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
   z.date().optional()
  ),
  companyId: ObjectIdOrStringId
 })
 .strict()

export const NewCandidateSchema = CandidateSchema.omit({
 companyId: true,
 contactedOn: true,
 callStatus: true
})

export const UpdateCandidateSchema = CandidateSchema.partial().omit({
 userId: true,
 companyId: true
})

export type Candidate = z.infer<typeof CandidateSchema>
export type NewCandidate = z.infer<typeof CandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>

export const CandidateJobInviteSchema = z.object({
 jobId: ObjectIdOrStringId,
 job: JobSchema.optional(),
 userIds: z.array(ObjectIdOrStringId).min(1),
 users: z.array(IUserSchema).optional()
})

export type CandidateJobInvite = z.infer<typeof CandidateJobInviteSchema>
