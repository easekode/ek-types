import { Schema } from 'mongoose'

export enum InvitationStatus {
 PENDING = 'pending',
 ACCEPTED = 'accepted',
 REJECTED = 'rejected'
}

export enum InvitationPurpose {
 COURSE = 'COURSE',
 BATCH = 'BATCH'
}

export interface IInvitation extends Document {
 courseId: Schema.Types.ObjectId
 batchId: Schema.Types.ObjectId
 email: string
 code: string
 purpose: InvitationPurpose
 status: InvitationStatus
}
