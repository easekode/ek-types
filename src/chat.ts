import type { Schema, Types } from 'mongoose'
import { IUser } from './user'
import { FileType } from './common'

export enum MessageTypes {
 TEXT = 'TEXT',
 AUDIO = 'AUDIO',
 VIDEO = 'VIDEO',
 IMAGE = 'IMAGE',
 DOCUMENT = 'DOCUMENT'
}

export interface IChatMessage {
 senderId?: Types.ObjectId
 sender?: IUser
 receiverId?: Types.ObjectId | string
 receiver?: IUser
 body: string
 conversationId?: Types.ObjectId
 isRead?: boolean
 messageType: MessageTypes
 groupId?: Types.ObjectId
 readByUsers?: Types.ObjectId[]
 file?: FileType
 createdAt?: Date
 updatedAt?: Date
}

export enum GroupActionTypes {
 JOIN = 'JOIN',
 LEAVE = 'LEAVE',
 INVITE = 'INVITE',
 REMOVE_MEMBER = 'REMOVE_MEMBER'
}

export enum GroupMemberRole {
 ADMIN = 'ADMIN',
 MEMBER = 'MEMBER'
}
export interface GroupMember {
 userId: Types.ObjectId
 role: GroupMemberRole
 joinedAt: Date
}

export interface IGroup {
 groupId: Types.ObjectId
 groupName: string
 description: string
 members: GroupMember[]
}
