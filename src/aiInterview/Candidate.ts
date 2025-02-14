import { z } from 'zod'
import { DateObjOrString, ObjectIdOrStringId } from '../common'
import { ProfileSource } from './ProfileSource'
import { CallStatus } from './Call'
import { IUserSchema } from '../user'
import { Document } from 'mongoose'

export enum CandidateStatus {
 CREATED = 'CREATED',
 SCHEDULED = 'SCHEDULED',
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
  lastWorkingDay: DateObjOrString.optional(),
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

export type Candidate = z.infer<typeof CandidateSchema> & Document
export type NewCandidate = z.infer<typeof CandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>

export const CandidateJobInviteSchema = z.object({
 jobId: ObjectIdOrStringId,
 candidateIds: z.array(ObjectIdOrStringId).min(1)
})

export type CandidateJobInvite = z.infer<typeof CandidateJobInviteSchema>

export const IsCandidateIvitedSchema = z.object({
    invitationCode: z.string()
})

export type IsCandidateIvited = z.infer<typeof IsCandidateIvitedSchema> 