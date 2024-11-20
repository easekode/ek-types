import { Schema } from 'mongoose'
import { IUser } from './user'
import { ICourseBatch, ICourseBatchSession } from './courseBatch'
import { Course } from './course'
export enum Level {
 EASY = 'EASY',
 MEDIUM = 'MEDIUM',
 HARD = 'HARD'
}

export enum ExamType {
 EXAM = 'Exam',
 QUIZ = 'Quiz'
}

export interface IExam extends Document {
 _id?: Schema.Types.ObjectId
 title: string
 description: string
 courseId?: Schema.Types.ObjectId
 course?: Course
 /* questions: IExamQuestion[]
 isNegativeScoring: boolean */
 createdById?: Schema.Types.ObjectId
 createdBy?: IUser
 level?: Level
 tags: string[]
 surveyJson: string
 type: ExamType
}

export type NewExam = Omit<IExam, keyof Document | 'createdById'> & {
 title: string
}

export enum ExamTrackerStatus {
 NOT_STARTED = 'NOT_STARTED',
 CANCELLED = 'CANCELLED',
 IN_PROGRESS = 'IN_PROGRESS',
 SUBMITTED = 'SUBMITTED',
 COMPLETED = 'COMPLETED'
}

export interface IExamTracker extends Document {
 examId: Schema.Types.ObjectId
 exam?: IExam
 studentId: Schema.Types.ObjectId
 student?: IUser
 questionId?: Schema.Types.ObjectId
 instructorId: Schema.Types.ObjectId
 isChecked?: boolean
 batchId?: Schema.Types.ObjectId
 batch?: ICourseBatch
 sessionId?: Schema.Types.ObjectId
 session?: ICourseBatchSession
 remarks?: string
 score?: number
 surveyData?: object
 surveyJson?: string
 status?: ExamTrackerStatus
 examCode?: string
}

export interface NewExamTrackersInput {
 batchId: Schema.Types.ObjectId
 examId: Schema.Types.ObjectId
 studentIds: Schema.Types.ObjectId[]
}

export interface NewAnswerInput {
 surveyData: object
 examId: Schema.Types.ObjectId
 batchId: Schema.Types.ObjectId
}

export type NewExamTracker = Omit<IExamTracker, keyof Document>

export type ExistingQuiz = {
 quiz: IExam
 isShared?: boolean
}
