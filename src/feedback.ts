import { Document, Types } from 'mongoose'
import { IUser } from './user'
import { FeedbackPurpose, ICourseBatch, ICourseBatchSession } from './courseBatch'

export interface FeedbackTopic extends Document {
 name: string
 feedbackType: FeedbackType
 active: boolean
 maxRating: number
 minRating: number
 weight: number
}

export type NewFeedbackTopic = Omit<FeedbackTopic, keyof Document>

export enum FeedbackType {
 RATE = 'RATE',
 YES_NO = 'YES_NO',
 DESCRIPTIVE = 'DESCRIPTIVE'
}

export interface IFeedback extends Document {
 userId?: Types.ObjectId
 user?: IUser
 batchId?: Types.ObjectId
 batch?: ICourseBatch
 sessionId?: Types.ObjectId
 session?: ICourseBatchSession
 purpose: FeedbackPurpose
 comment?: string
 rating?: number
 feedbackByTopics?: {
  topicId: Types.ObjectId
  topic?: FeedbackTopic
  rating?: number
  isChecked?: boolean
  comment?: string
 }[]
}

export type NewFeedback = Omit<IFeedback, keyof Document>
