import { z } from 'zod'
import { Document } from 'mongoose'
import { ActiveStatus, DateObjOrString, ObjectIdOrStringId } from '../common'
import { HiringCompanySchema } from './HiringCompany'
import { Candidate } from './Candidate'
import { IInvitation } from '../invitation'
import { Interview } from './Interview'
import { InterviewQuestion } from './InterviewQuestion'

export const JobSchema = z.object({
 title: z.string(),
 expYears: z.number(),
 jobDescription: z.string(),
 code: z.string().optional(),
 examIds: z.array(ObjectIdOrStringId).min(1).optional(),
 createdBy: ObjectIdOrStringId,
 updatedBy: ObjectIdOrStringId.optional(),
 hiringCompanyId: ObjectIdOrStringId.optional(),
 hiringCompany: HiringCompanySchema.optional(),
 status: z.nativeEnum(ActiveStatus).optional(),
 companyId: ObjectIdOrStringId,
 expiryDate: DateObjOrString,
 sttKeywords: z.array(z.string()).optional()
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

export interface InterviewPanelInfo {
 job?: TransformedJob
 candidate?: Candidate
 interview?: Interview
 interviewQuestionInfo?: Pick<InterviewQuestion, 'totalQuestions'>
}

export const SuggestJobDescriptionInputSchema = z.object({
 title: z.string(),
 expYears: z.number(),
 length: z.enum(['short', 'medium', 'long'])
})

export const SuggestJobDescriptionResSchema = z.object({
 job_description: z.string()
})

export type SuggestJobDescriptionInput = z.infer<typeof SuggestJobDescriptionInputSchema>
export type SuggestJobDescrptionRes = z.infer<typeof SuggestJobDescriptionResSchema>
