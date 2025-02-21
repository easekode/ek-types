import { z } from 'zod'
import { Document } from 'mongoose'
import { ActiveStatus, DateObjOrString, ObjectIdOrStringId } from '../common'
import { HiringCompanySchema } from './HiringCompany'
import { Candidate } from './Candidate'
import { IInvitation } from '../invitation'

export const JobSchema = z.object({
 title: z.string(),
 expYears: z.number(),
 jobDescription: z.string(),
 examIds: z.array(ObjectIdOrStringId).min(1).optional(),
 createdBy: ObjectIdOrStringId,
 updatedBy: ObjectIdOrStringId.optional(),
 hiringCompanyId: ObjectIdOrStringId.optional(),
 hiringCompany: HiringCompanySchema.optional(),
 status: z.nativeEnum(ActiveStatus).optional(),
 companyId: ObjectIdOrStringId,
 expiryDate: DateObjOrString
})

export const updateJobSchema = JobSchema.partial().omit({
 createdBy: true,
 companyId: true
})

export const NewJobSchema = JobSchema.omit({
 createdBy: true,
 updatedBy: true,
 status: true,
 companyId: true
}).strict()

export type JobKeys = keyof Job
export type TransformedJob = {
 [key in JobKeys]?: any
}
export interface JobMethods {
 transform: (fieldsToInclude?: JobKeys[]) => TransformedJob
}

export type Job = z.infer<typeof JobSchema> & JobMethods & Document
export type NewJob = z.infer<typeof NewJobSchema>
export type UpdateJob = z.infer<typeof updateJobSchema>

export interface JobInvitationInfo {
 job: Job
 candidate: Candidate
 link: string
}
export interface CandidateInvitationInfo {
 invitaiton?: IInvitation
 candidate?: Candidate
 job?: TransformedJob
}
