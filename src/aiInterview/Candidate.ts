import { z } from 'zod'
import { CreatedAndUpdatedAt, DateObjOrString, ObjectIdOrStringId } from '../common'
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
  userId: ObjectIdOrStringId.optional(),
  email: z.string().email(),
  name: z.string(),
  user: IUserSchema.optional(),
  resumeUrl: z.string().url(),
  workExperience: z
   .array(
    z.object({
     company: z.string().min(1),
     role: z.string().min(1),
     startDate: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date()),
     endDate: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional())
    })
   )
   .optional(),
  expInYrs: z.number().optional(),
  lastWorkingDay: DateObjOrString.optional(),
  source: z.nativeEnum(ProfileSource).optional(),
  status: z.nativeEnum(CandidateStatus).optional(),
  callStatus: z.nativeEnum(CallStatus).optional(),
  contactedOn: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional()),
  companyId: ObjectIdOrStringId
 })
 .strict()

export const NewCandidateSchema = CandidateSchema.omit({
 userId: true,
 companyId: true,
 contactedOn: true,
 callStatus: true
}).strict()

export const UpdateCandidateSchema = CandidateSchema.partial()
 .omit({
  email: true,
  userId: true,
  companyId: true
 })
 .strict()

export type Candidate = z.infer<typeof CandidateSchema> & Document & CreatedAndUpdatedAt
export type NewCandidate = z.infer<typeof CandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>

export const CandidateFilterSchema = CandidateSchema.partial().extend({
 fromDate: z.string().optional(),
 toDate: z.string().optional()
})

export type CandidateFilter = z.infer<typeof CandidateFilterSchema>

export const CandidateJobInviteSchema = z
 .object({
  jobId: ObjectIdOrStringId,
  candidateIds: z.array(ObjectIdOrStringId),
  filter: CandidateFilterSchema.optional()
 })
 .refine((data) => data.candidateIds.length > 0 || (data.filter && Object.keys(data.filter).length > 0), {
  message: 'When candidateIds is empty, there should be at least one filter item in filter',
  path: ['filter']
 })

export type CandidateJobInvite = z.infer<typeof CandidateJobInviteSchema>

export const IsCandidateIvitedSchema = z.object({
 invitationCode: z.string()
})

export type IsCandidateIvited = z.infer<typeof IsCandidateIvitedSchema>
