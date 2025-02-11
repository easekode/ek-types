import { z } from 'zod'
import { Document } from 'mongoose'
import { ActiveStatus, ObjectIdOrStringId } from '../common'
import { HiringCompanySchema } from './HiringCompany'

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
 companyId: ObjectIdOrStringId
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

export type Job = z.infer<typeof JobSchema> & Document
export type NewJob = z.infer<typeof NewJobSchema>
export type UpdateJob = z.infer<typeof updateJobSchema>
