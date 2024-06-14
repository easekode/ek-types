import { Document, Schema } from 'mongoose';
import { QueryStringType } from './pagination';
import { IUser } from './user';
import { IEvent, NewEvent } from './event';
import { Course } from './course';
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

interface CourseProgressSchema {
  courseId: Schema.Types.ObjectId;
  chapters: {
    _id?: Schema.Types.ObjectId;

    name: string;
    topics: {
      _id?: Schema.Types.ObjectId;

      name: string;
      status: CourseBatchTrackerStatus;
    }[];
    status: CourseBatchTrackerStatus;
  }[];
  status: CourseBatchTrackerStatus;
}
export interface ICourseBatch extends Document {
  name: string;
  code: string;
  courseId?: Schema.Types.ObjectId;
  course?: Course;
  instructorIds?: Schema.Types.ObjectId[];
  instructors?: IUser[];
  currentInstructorId?: Schema.Types.ObjectId;
  currentInstructor?: IUser;
  eventId?: Schema.Types.ObjectId;
  event?: IEvent;
  courseProgress?: CourseProgressSchema;
  status?: CourseBatchStatus;
  stats?: {
    totalChapters: number;
    completedChapters: number;
    ratings: number;
    completedSessions: number;
  };
}

export interface NewBatch extends Omit<ICourseBatch, keyof Document | 'event'> {
  event: NewEvent;
}

export interface IStudentBatchAssociation extends Document {
  userId?: Schema.Types.ObjectId;
  user?: IUser;
  batchId?: Schema.Types.ObjectId;
  batch?: ICourseBatch;
  status?: CourseBatchAssnStatus;
}

export interface ICourseBatchSessionAttendance {
  _id?: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  session: Schema.Types.ObjectId;
}

export interface ICourseBatchSession extends Document {
  slNo?: number;
  name: string;
  batchId: Schema.Types.ObjectId;
  duration: number;
  status?: SessionStatus;
  startDateTime: Date;
  endDateTime?: Date;
  teacherId: Schema.Types.ObjectId;
  feedback?: Schema.Types.ObjectId[];
  notes?: string;
}

export interface ICourseBatchSessionClient extends ICourseBatch {
  course: Course;
}

export interface NewCourseBatchSession {
  batchId: string;
}

export type CourseBatchSessionType = Omit<ICourseBatchSession, keyof Document>;
export interface IFeedback extends Document {
  user: Schema.Types.ObjectId;
  batchId?: Schema.Types.ObjectId;
  sessionId?: Schema.Types.ObjectId;
  purpose: FeedbackPurpose;
  comment?: string;
  rating?: number;
  feedbackByTopics?: {
    topic: Schema.Types.ObjectId;
    rating?: number;
    isChecked?: boolean;
  }[];
}

export interface CourseProgressUpdateType {
  batchId: string;
  chapterId?: string;
  topicId?: string;
  status?: CourseBatchTrackerStatus;
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
  batch: Schema.Types.ObjectId;
  subject: Schema.Types.ObjectId;
  chapter: Schema.Types.ObjectId;
  topic: Schema.Types.ObjectId;
  course: {
    courseId: Schema.Types.ObjectId;
    subjects: {
      subjectId: Schema.Types.ObjectId;
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
  studentIds?: Schema.Types.ObjectId[];
  batchId: Schema.Types.ObjectId;
}

export interface UpdateCourseBatchTrackerInput {
  batchId: string;
  courseId: string;
  subjectId: string;
  chapterName: string;
  topicName: string;
  completed: boolean;
}
