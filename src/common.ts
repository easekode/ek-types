import { Types } from 'mongoose'
import { z } from 'zod'

export const ImageSchema = z.object({
 file: z.string().optional(),
 name: z.string(),
 url: z.string().optional(),
 alt: z.string().optional()
})

export type Image = z.infer<typeof ImageSchema>

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

export enum NA {
 SHORT = 'N/A',
 LONG = 'NOT APPLICABLE'
}

export enum NotAvailable {
 LONG = 'Not Available'
}

export const MongoObjectIdString = z.string().refine((id) => id.match(/^[0-9a-fA-F]{24}$/), {
 message: 'Invalid object id'
})

export const ObjectIdOrStringId = z.union([MongoObjectIdString, z.instanceof(Types.ObjectId)])
export const CreatedAndUpdatedBySchema = z.object({
 createdBy: ObjectIdOrStringId.optional(),
 updatedBy: ObjectIdOrStringId.optional()
})

export const CreateAtUpdateAtSchema = z.object({
 createdAt: z.date().optional(),
 updatedAt: z.date().optional()
})

export type CreatedAndUpdatedAt = z.infer<typeof CreatedAndUpdatedBySchema>

export const DateObjOrString = z.preprocess(
 (arg) => (typeof arg === 'string' ? new Date(arg) : arg),
 z.date()
)
