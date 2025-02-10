import { z } from 'zod'
import { ActiveStatus } from '../common'
import { ProfileSource } from './ProfileSource'
import { CallStatus } from './Call'
import { IUserSchema } from '../user'

export enum CandidateStatus {
 PENDING = 'PENDING',
 UNDER_REVIEW = 'UNDER_REVIEW',
 FOLLOW_UP = 'FOLLOW_UP',
 SELECTED = 'SELECTED',
 PENDING_REVIEW = 'PENDING_REVIEW',
 REJECTED = 'REJECTED'
}

export const CandidateSchema = z.object({
 userId: z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
  message: 'Invalid id userId'
 }),
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
 lastWorkingDay: z.date().optional(),
 source: z.nativeEnum(ProfileSource),
 status: z.nativeEnum(CandidateStatus),
 callStatus: z.nativeEnum(CallStatus),
 contactedOn: z.date()
})

export const UpdateCandidateSchema = CandidateSchema.partial()

export type NewCandidate = z.infer<typeof CandidateSchema>
export type UpdateCandidate = z.infer<typeof UpdateCandidateSchema>
