import { Date, Schema, Types } from 'mongoose'
import { IUser } from './user'
import { Course } from './course'

export enum EnrollmentStatus {
 ENROLLED = 'ENROLLED',
 NOT_ENROLLED = 'NOT_ENROLLED',
 PENDING = 'PENDING',
 CANCELED = 'CANCELED'
}

export interface IEnrollment extends Document {
 studentId: Types.ObjectId
 student?: IUser
 courseId: Types.ObjectId
 course?: Course
 enrollmentDate: Date
 status?: EnrollmentStatus
}

export interface NewEnrollment {
 studentId: Types.ObjectId
 courseId: Types.ObjectId
 batchId?: Types.ObjectId
 enrollmentDate?: Date
}

export interface BulkEnrollmentRow {
 studentCode?: string
 studentName?: string
 studentEmail?: string
 courseCode: string
 enrollmentDate: Date
 enrollmentStatus: EnrollmentStatus
}
