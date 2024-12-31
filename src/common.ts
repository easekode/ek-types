import type { Schema, Types } from 'mongoose'
import { z } from 'zod'
export interface Image {
 file?: string
 name: string
 alt?: string
 url?: string
}

export const FileTypeSchema = z.object({
 file: z.string().optional(),
 name: z.string(),
 url: z.string().optional(),
 alt: z.string().optional()
})

export type FileType = z.infer<typeof FileTypeSchema>

export enum ActiveStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE'
}
export enum AccountStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE',
 SUSPENDED = 'SUSPENDED',
 BLOCKED = 'BLOCKED'
}
export interface ICommonFields {
 createdBy?: Types.ObjectId
 lastUpdatedBy?: Types.ObjectId
}
