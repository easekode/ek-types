import { Date, Schema, Types } from 'mongoose';

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  NOT_ENROLLED = 'NOT_ENROLLED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export interface IEnrollment extends Document {
  student: Types.ObjectId;
  course: Types.ObjectId;
  enrollmentDate: Date;
  status?: EnrollmentStatus;
}

export interface NewEnrollment {
  student?: Schema.Types.ObjectId;
  course: Schema.Types.ObjectId;
  enrollmentDate: Date;
}

export interface BulkEnrollmentRow {
  studentCode?: string;
  studentName?: string;
  studentEmail?: string;
  courseCode: string;
  enrollmentDate: Date;
  enrollmentStatus: EnrollmentStatus;
}
