import { Types, Document } from 'mongoose'
import { z } from 'zod'
import { IUserSchema } from './user'
import { CourseSchema } from './course'

export enum EnrollmentStatus {
 ENROLLED = 'ENROLLED',
 NOT_ENROLLED = 'NOT_ENROLLED',
 PENDING = 'PENDING',
 CANCELLED = 'CANCELLED'
}

export const NewEnrollmentSchema = z.object({
 studentId: z.instanceof(Types.ObjectId),
 student: IUserSchema.optional(),
 courseId: z.instanceof(Types.ObjectId),
 course: CourseSchema.optional(),
 enrollmentDate: z.date(),
 status: z.optional(z.nativeEnum(EnrollmentStatus)),
 companyId: z.instanceof(Types.ObjectId)
})

export const UpdateEnrollmentSchema = NewEnrollmentSchema.partial()

export type NewEnrollment = z.infer<typeof NewEnrollmentSchema>
export type IEnrollment = z.infer<typeof NewEnrollmentSchema> & Document
export type UpdateEnrollment = z.infer<typeof UpdateEnrollmentSchema>

export const BulkEnrollmentRowSchema = z.object({
 studentCode: z.optional(z.string()),
 studentName: z.optional(z.string()),
 studentEmail: z.optional(z.string().email()),
 courseCode: z.string(),
 enrollmentDate: z.date(),
 enrollmentStatus: z.nativeEnum(EnrollmentStatus)
})

export type BulkEnrollmentRow = z.infer<typeof BulkEnrollmentRowSchema>

const NewSelfEnrollSchema = NewEnrollmentSchema.partial().extend({
 courseId: z.instanceof(Types.ObjectId)
})

export type NewSelfEnroll = z.infer<typeof NewSelfEnrollSchema>
