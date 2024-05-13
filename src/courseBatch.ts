import { Types } from 'mongoose';
import { ActiveStatus } from './common';
import { QueryStringType } from './pagination';
import { IUser } from './user';
import { NewEvent } from './event';
export enum FeedbackPurpose {
  COURSE_BATCH = 'batch',
  COURSE_BATCH_SESSION = 'session',
  APP_SERVICE = 'APP_SERVICE',
}

export enum EventPurpose {
  COURSE_BATCH = 'batch',
  COURSE_BATCH_SESSION = 'session',
}

export enum EventMode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum CourseBatchAssnStatus {
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}
export enum SessionStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum EventStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum CourseBatchStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export enum CourseBatchTrackerStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export enum SessionFrequency {
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
  WEEKENDS = 'WEEKENDS',
  ALTERNATE_DAYS = 'ALTERNATE_DAYS',
  WEEKDAYS = 'WEEKDAYS',
}

export interface ICourseBatch extends Document {
  name: string;
  code: string;
  course: Types.ObjectId;
  instructors?: Types.ObjectId[];
  currentInstructor?: Types.ObjectId;
  event?: Types.ObjectId;
  status?: CourseBatchStatus;
}

export interface NewBatch extends Omit<ICourseBatch, keyof Document | 'event'> {
  event: NewEvent;
}

export interface IStudentBatchAssociation extends Document {
  user: Types.ObjectId;
  batch: Types.ObjectId;
  status?: CourseBatchAssnStatus;
}

export interface ICourseBatchSessionAttendance {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  session: Types.ObjectId;
}

export interface ICourseBatchSession extends Document {
  slNo?: number;
  name: string;
  batchId: Types.ObjectId;
  duration: number;
  status?: SessionStatus;
  startDateTime: Date;
  feedback?: Types.ObjectId[];
}

export type CourseBatchSessionType = Omit<ICourseBatchSession, keyof Document>;
export interface IFeedback extends Document {
  user: Types.ObjectId;
  batchId?: Types.ObjectId;
  sessionId?: Types.ObjectId;
  purpose: FeedbackPurpose;
  comment?: string;
  rating?: number;
  feedbackByTopics?: {
    topic: Types.ObjectId;
    rating?: number;
    isChecked?: boolean;
  }[];
}

export type NewFeedback = Omit<IFeedback, keyof Document>;

/* const newFeedback: NewFeedback = {
 
  feedbacks: [
    {
      topic: '123', // Teacher engagement rating topic
      rating: 4, // 1-5
    },
    {
      topic: '1234', // Teacher engagement rating topic
      rating: 5, // 1-5
    },
  ],
}; */

export interface IFeedbackQuery {
  query?: {
    user?: string;
    batch?: string;
    session?: string;
    populate?: string;
    populateKeys?: string;
  } & QueryStringType;
}

//this event can be mapped to calender to present (in the UI)

export interface IStudentBatchAssocQuery {
  query?: {
    user?: string;
    batch?: string;
    populate?: string;
    populateKeys?: string;
  } & QueryStringType;
}

export interface ICourseBatchTracker extends Document {
  batch: Types.ObjectId;
  subject: Types.ObjectId;
  chapter: Types.ObjectId;
  topic: Types.ObjectId;
  course: {
    courseId: Types.ObjectId;
    subjects: {
      subjectId: Types.ObjectId;
      chapters: {
        name: string;
        topics: {
          name: string;
          status: CourseBatchTrackerStatus;
        }[];
        status: CourseBatchTrackerStatus;
      }[];
      status: CourseBatchTrackerStatus;
    }[];
    status: CourseBatchTrackerStatus;
  };
  status: CourseBatchTrackerStatus;
  stats: {
    totalChapters: number;
    completedChapters: number;
    ratings: number;
    completedSessions: number;
  };
  instructor: IUser;
  startDate: Date;
  endDate: Date;
}

export interface NewBatchAssnBodyType {
  emails?: string[];
  studentIds?: Types.ObjectId[];
  batchId: Types.ObjectId;
}

export interface UpdateCourseBatchTrackerInput {
  batchId: string;
  courseId: string;
  subjectId: string;
  chapterName: string;
  topicName: string;
  completed: boolean;
}
