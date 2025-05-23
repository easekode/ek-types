import { Schema, Types } from 'mongoose'

export enum OtpPurpose {
 LOGIN = 'LOGIN',
 REGISTER = 'REGISTER',
 FORGOT_PASSWORD = 'FORGOT_PASSWORD'
}
export interface IOtp extends Document {
 otp?: string
 purpose: OtpPurpose
 userId?: Types.ObjectId
 email?: string
 createdAt?: Date
 updatedAt?: Date
 companyId?: Types.ObjectId
}

export type OtpRequestBody = Omit<
 IOtp,
 keyof Document | 'userId' | 'createdAt' | 'updatedAt' | 'otp'
>
export type NewOtp = Omit<IOtp, keyof Document | 'createdAt' | 'updatedAt'>
