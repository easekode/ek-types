import { Model, Schema } from 'mongoose'
import { AccountStatus, ICommonFields, Image } from './common'
import { LoginResponse } from './auth'

export enum Gender {
 MALE = 'MALE',
 FEMALE = 'FEMALE',
 TRANSGENDER = 'TRANSGENDER',
 NOT_SAY = 'RATHER NOT SAY'
}

export interface IAddress {
 address?: string
 city?: string
 country?: string
 state?: string
 landmark?: string
 pinCode?: string
 location?: {
  type: string
  coordinates: number[]
 }
}

export interface IEnrollmentDetails {
 enrollment?: {
  enrollId: string
  date: Date
 }
}

export interface StudentDetails {
 studentCode?: string
}

export interface IPersonalInfo {
 name?: string
 uniqueId?: string
 dob?: string
 mobile?: string
 email?: string
 gender?: Gender
 address?: IAddress[]
 emailVerified?: boolean
 mobileVerified?: boolean
 profilePicture?: Image
}

export type TransformedUser = {
 [key in IUserKeys]?: any
}

export type IUserKeys = keyof IUser

export interface IUserMethods {
 isValidPassword(password: string): Promise<boolean>
 isAllowed(): boolean
 isAccBlocked(): boolean
 transform(fieldsToInclude: IUserKeys[]): TransformedUser
 generateAuthToken(): LoginResponse
 hasRole(role: string): boolean
 hasScope(scope: string): boolean
 isEmailTaken(email: string): Promise<boolean>
 isMobileTaken(mobile: string): Promise<boolean>
}

export interface IUser extends ICommonFields, IPersonalInfo, IEnrollmentDetails, StudentDetails {
 _id?: Schema.Types.ObjectId
 roles?: Schema.Types.ObjectId[] | string[]
 isAdmin?: boolean
 lastLoggedIn?: Date
 isAccountVerified?: boolean
 accountStatus?: AccountStatus
 password?: string
 scopes?: string[]
 isProfileComplete?: boolean
}

export type IUserAndMethods = IUser & IUserMethods

export interface IUserModel extends Model<IUser, object, IUserMethods> {
 isEmailTaken(email: string): Promise<boolean>
 isMobileTaken(mobile: string): Promise<boolean>
}
