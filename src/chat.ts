import type { Schema } from 'mongoose'
import { IUser } from './user'

export enum MessageTypes {
 TEXT = 'TEXT',
 AUDIO = 'AUDIO',
 VIDEO = 'VIDEO',
 IMAGE = 'IMAGE',
 DOCUMENT = 'DOCUMENT'
}
export interface IChatMessage {
 senderId?: Schema.Types.ObjectId
 sender?: IUser
 receiverId?: Schema.Types.ObjectId
 receiver?: IUser
 body: string
 conversationId?: Schema.Types.ObjectId
 isRead?: boolean
 messageType: MessageTypes
 groupId?: Schema.Types.ObjectId
 readByUsers?: Schema.Types.ObjectId[]
}
