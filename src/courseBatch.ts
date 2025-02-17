import { Document, Schema, Types } from 'mongoose'
import { PaginatedResult, QueryStringType } from './pagination'
import { IUser } from './user'
import { IEvent, NewEvent } from './event'
import { Course } from './course'
import { IInvitation } from './invitation'
import { IExam } from './exam'
export enum FeedbackPurpose {
 COURSE_BATCH = 'batch',
 COURSE_BATCH_SESSION = 'session',
 APP_SERVICE = 'APP_SERVICE'
}

export enum EventPurpose {
 COURSE_BATCH = 'batch',
 COURSE_BATCH_SESSION = 'session'
}

export enum EventMode {
 ONLINE = 'ONLINE',
 OFFLINE = 'OFFLINE'
}

export enum CourseBatchAssnStatus {
 PENDING = 'PENDING',
 ACTIVE = 'ACTIVE',
 INACTIVE = 'INACTIVE'
}
export enum SessionStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum EventStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum CourseBatchStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED',
 CANCELLED = 'CANCELLED'
}

export enum CourseBatchTrackerStatus {
 NOT_STARTED = 'NOT_STARTED',
 IN_PROGRESS = 'IN_PROGRESS',
 COMPLETED = 'COMPLETED'
}

export enum ExamShareStatus {
 NOT_SHARED = 'NOT_SHARED',
 SHARED = 'SHARED'
}

export enum SessionFrequency {
 DAILY = 'DAILY',
 WEEKLY = 'WEEKLY',
 WEEKENDS = 'WEEKENDS',
 ALTERNATE_DAYS = 'ALTERNATE_DAYS',
 WEEKDAYS = 'WEEKDAYS'
}

export interface TopicProgress {
 _id?: Types.ObjectId

 name: string
 status: CourseBatchTrackerStatus
}
export interface ChapterProgress {
 _id?: Types.ObjectId
 name: string
 topics: TopicProgress[]
 status: CourseBatchTrackerStatus
 examIdStatus: {
  examId: Types.ObjectId
  exam?: IExam
  status: ExamShareStatus
 }[]
}

export interface CourseProgressSchema {
 courseId: Types.ObjectId
 chapters: ChapterProgress[]
 status: CourseBatchTrackerStatus
}
export interface ICourseBatch extends Document {
 //  _id?: Types.ObjectId
 name: string
 code: string
 courseId?: Types.ObjectId
 course?: Course
 instructorIds?: Types.ObjectId[]
 instructors?: IUser[]
 currentInstructorId?: Types.ObjectId
 currentInstructor?: IUser
 eventId?: Types.ObjectId
 event?: IEvent
 courseProgress?: CourseProgressSchema
 status?: CourseBatchStatus
 stats?: {
  totalChapters: number
  completedChapters: number
  ratings: number
  completedSessions: number
 }
 totalStudents?: number
}

export interface NewCourseBatch extends Omit<ICourseBatch, keyof Document | 'event'> {
 event: NewEvent
}

export interface IStudentBatchAssociation extends Document {
 userId?: Types.ObjectId
 user?: IUser
 batchId?: Types.ObjectId
 batch?: ICourseBatch
 status?: CourseBatchAssnStatus
}

export enum SessionAttendanceStatus {
 PRESENT = 'PRESENT',
 ABSENT = 'ABSENT',
 LATE = 'LATE',
 NOT_APPLICABLE = 'NOT_APPLICABLE'
}

export interface ICourseBatchSessionAttendance {
 _id?: Types.ObjectId
 userId: Types.ObjectId
 user?: IUser
 sessionId: Types.ObjectId
 session?: ICourseBatchSession
 status: SessionAttendanceStatus
}

export interface NewAttendance {
 sessionId: Types.ObjectId
 status: SessionAttendanceStatus
}

export interface ICourseBatchSession extends Document {
 slNo?: number
 name: string
 batchId: Types.ObjectId
 batch?: ICourseBatch
 duration: number
 status?: SessionStatus
 startDateTime: Date
 endDateTime?: Date
 teacherId: Types.ObjectId
 teacher?: IUser
 feedback?: Types.ObjectId[]
 averageRating?: number
 notes?: string
 meetingLink?: string
}

export interface TeacherCourseBatchResponse {
 batch: ICourseBatch
 pendingInvites: IInvitation[]
 members: PaginatedResult<any>
 studentScores?: IStudentScore[]
}

export interface IExamSetting {
  gradeA: number;
  gradeB: number;
  gradeC: number;
}
export interface IStudentScore {
 studentId: string
 score: number
 percentage: number
 grade: string
}
export interface ICourseBatchSessionClient extends ICourseBatch {
 course: Course
}

export interface NewCourseBatchSession {
 batchId: string
}

export type CourseBatchSessionType = Omit<ICourseBatchSession, keyof Document>

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
  user?: string
  batch?: string
  session?: string
  populate?: string
  populateKeys?: string
 } & QueryStringType
}

//this event can be mapped to calender to present (in the UI)

export interface IStudentBatchAssocQuery {
 query?: {
  user?: string
  batch?: string
  populate?: string
  populateKeys?: string
 } & QueryStringType
}

export interface ICourseBatchTracker extends Document {
 batch: Types.ObjectId
 subject: Types.ObjectId
 chapter: Types.ObjectId
 topic: Types.ObjectId
 course: {
  courseId: Types.ObjectId
  subjects: {
   subjectId: Types.ObjectId
   chapters: {
    name: string
    topics: {
     name: string
     status: CourseBatchTrackerStatus
    }[]
    status: CourseBatchTrackerStatus
   }[]
   status: CourseBatchTrackerStatus
  }[]
  status: CourseBatchTrackerStatus
 }
 status: CourseBatchTrackerStatus
 stats: {
  totalChapters: number
  completedChapters: number
  ratings: number
  completedSessions: number
 }
 instructor: IUser
 startDate: Date
 endDate: Date
}

export interface NewBatchAssnBodyType {
 emails?: string[]
 studentIds?: Types.ObjectId[]
 batchId: Types.ObjectId
}

export interface UpdateCourseBatchTrackerInput {
 batchId: string
 courseId: string
 subjectId: string
 chapterName: string
 topicName: string
 completed: boolean
}

export interface CourseProgressUpdateType {
 batchId: string
 status: CourseBatchTrackerStatus
 chaptersCovered?: {
  chapterId: string
  topicIds: string[]
 }[]
}

export interface EndSessionBody {
 sessionId: string
 progress: CourseProgressUpdateType
 notes: string
}
export interface BatchComposite {
 batchId: string
 title: string
}
