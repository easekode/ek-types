import { z } from 'zod'
import { addressCreateSchema } from './address'

export interface ICompany extends Document {
 companyId: string
 name: string
}

export type NewCompany = Omit<ICompany, '_id'>

export const companyProfileCreateSchema = z.object({
 name: z.string().trim(),
 representativeName: z.string().trim(),
 address: addressCreateSchema,
 website: z.string().url().trim(),
 numberOfEmployees: z.number().default(0),
 establishedDate: z.string(),
 companyDescription: z.string(),
 secondaryEmail: z.string().email(),
 clientKey: z.string().trim().optional(),
})

export type CompanyProfileCreate = z.infer<typeof companyProfileCreateSchema>

export const companyProfileUpdateSchema = companyProfileCreateSchema.partial()

export type CompanyProfileUpdate = z.infer<typeof companyProfileUpdateSchema>
