import { Date, ObjectId } from 'mongoose';

export enum EnrollmentStatus {
  ENROLLED = 'ENROLLED',
  NOT_ENROLLED = 'NOT_ENROLLED',
  PENDING = 'PENDING',
  CANCELED = 'CANCELED',
}

export interface IEnrollment extends Document {
  student: ObjectId;
  course: ObjectId;
  enrollmentDate: Date;
  status?: EnrollmentStatus;
}

export interface NewEnrollment {
  student?: ObjectId;
  course: ObjectId;
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
