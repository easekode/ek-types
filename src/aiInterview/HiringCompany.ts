import { z } from 'zod'
import { Document } from 'mongoose'
import { CreatedAndUpdatedBySchema, ObjectIdOrStringId } from '../common'

export enum CompanyType {
 VENDOR = 'VENDOR',
 INTERNAL = 'INTERNAL',
 EXTERNAL = 'EXTERNAL'
}

export const HiringCompanySchema = z
 .object({
name: z.string().min(1),
address: z.string().optional(),
contactEmail: z.string().email(),
contactPhone: z.string().optional(),
website: z.string().optional(),
type: z.nativeEnum(CompanyType).default(CompanyType.INTERNAL),
companyId: ObjectIdOrStringId
})
.merge(CreatedAndUpdatedBySchema)

export const UpdateHiringCompanySchema = HiringCompanySchema.partial().omit({ companyId: true })
export const NewHiringCompanySchema = HiringCompanySchema.omit({ companyId: true })

export type HiringCompany = z.infer<typeof HiringCompanySchema> & Document
export type NewHiringCompany = z.infer<typeof NewHiringCompanySchema>
export type UpdateHiringCompany = z.infer<typeof UpdateHiringCompanySchema>

export interface InterviewDashboard {
 totalHiringCompanies: number
 totalJobs: number
 totalInterviews: number
}
