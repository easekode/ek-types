import { Schema } from 'mongoose'
import { IUser } from './user'
import { ICourseBatch } from './courseBatch'
export enum Level {
 EASY = 'EASY',
 MEDIUM = 'MEDIUM',
 HARD = 'HARD'
}

export interface IExam extends Document {
 _id: Schema.Types.ObjectId
 title: string
 description: string
 /* questions: IExamQuestion[]
 isNegativeScoring: boolean */
 createdBy: Schema.Types.ObjectId
 level: Level
 tags: string[]
 surveyJson: string
}

export type NewExam = Omit<IExam, keyof Document | 'createdBy'>

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
 remarks?: string
 score?: number
 surveyData?: object
 surveyJson?: string
 attempted?: boolean
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
