import { Model, Schema, Document, Types } from 'mongoose'
import { AccountStatus, ICommonFields, Image } from './common'
import { LoginResponse } from './auth'
import { IEnrollment } from './enrollment'
import { Certificate } from './certificate'
import { PaginatedResult } from './pagination'

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
 getLoginResponse(): LoginResponse
 hasRole(role: string): boolean
 hasScope(scope: string): boolean
 isEmailTaken(email: string): Promise<boolean>
 isMobileTaken(mobile: string): Promise<boolean>
 hasRoleById(roleId: string): boolean
}

export interface ClientInfo {
 companyId?: Schema.Types.ObjectId
 isClientRegistration?: boolean
}

export interface IUser
 extends Document,
  ICommonFields,
  IPersonalInfo,
  StudentDetails,
  StudentDetails,
  ClientInfo {
 roles?: Types.ObjectId[] | string[]
 isAdmin?: boolean
 lastLoggedIn?: Date
 isAccountVerified?: boolean
 accountStatus?: AccountStatus
 password?: string
 scopes?: string[]
 isProfileComplete?: boolean
 deviceToken?: string[]
 createdAt?: Date
 updatedAt?: Date
 //to store any temporary data of the user which will get processed later
 signUpData?: string
}

export type IUserAndMethods = IUser & IUserMethods

export interface IUserModel extends Model<IUser, object, IUserMethods> {
 isEmailTaken(email: string): Promise<boolean>
 isMobileTaken(mobile: string): Promise<boolean>
}

export interface CreateUserBody {
 email: string
 mobile?: string
 password: string
 name: string
 roleId: string
}

export interface CompleteProfile {
 profile: IUser
 enrollments?: PaginatedResult<IEnrollment>
 certificates?: PaginatedResult<Certificate>
}

export interface UserFilter {
 userId?: Schema.Types.ObjectId
 companyId?: Schema.Types.ObjectId
 accountStatus?: AccountStatus
}
