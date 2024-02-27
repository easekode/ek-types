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
