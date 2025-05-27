import { z } from 'zod'
import { CreatedAndUpdatedAt, DateObjOrString, ObjectIdOrStringId } from '../common'
import { ProfileSource } from './ProfileSource'
import { CallStatus } from './Call'
import { IUserSchema } from '../user'
import { Document } from 'mongoose'
import { HiringCompanySchema } from './HiringCompany'
import { JobSchema } from './Job'
import { InvitationStatus } from '../invitation'
import { InterviewRoundSchema } from './InterviewRound'

export enum CandidateStatus {
 NEW = 'NEW', // Initial state when candidate is first added
 INVITED = 'INVITED', // Waiting for interview to be scheduled
 SCHEDULED = 'SCHEDULED', // Interview has been scheduled
 PENDING_REVIEW = 'PENDING_REVIEW', // Interview completed, waiting for review
 UNDER_REVIEW = 'UNDER_REVIEW', // Currently being reviewed
 FOLLOW_UP = 'FOLLOW_UP', // Need additional interview/discussion
 SELECTED = 'SELECTED', // Candidate has been selected
 REJECTED = 'REJECTED', // Candidate was not selected
 ON_HOLD = 'ON_HOLD', // Candidate is on hold for future consideration
 AWAITING_NEXT_ROUND = 'AWAITING_NEXT_ROUND' //only when prev round got selected Waiting for the next round to be scheduled
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
     startDate: z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date().optional()),
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
  companyId: ObjectIdOrStringId, // this is the companyId where the recruiter is working
  hiringCompanyId: ObjectIdOrStringId.optional(),
  hiringCompany: HiringCompanySchema.optional(),
  jobId: ObjectIdOrStringId.optional(),
  job: JobSchema.optional(),
  interviewRounds: z.array(InterviewRoundSchema).optional()
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
export type NewCandidate = z.infer<typeof NewCandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>

export const CandidateFilterSchema = CandidateSchema.partial().extend({
 fromDate: z.string().optional(),
 toDate: z.string().optional(),
 statuses: z.array(z.nativeEnum(CandidateStatus)).optional(),
 invitationStatuses: z.array(z.nativeEnum(InvitationStatus)).optional(),
 hiringCompanyIds: z.array(ObjectIdOrStringId).optional(),
 jobIds: z.array(ObjectIdOrStringId).optional()
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
