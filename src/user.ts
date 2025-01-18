import { z } from 'zod'
import { AccountStatus, Image } from './common'
import { LoginResponse } from './auth'
import { IEnrollment } from './enrollment'
import { Certificate } from './certificate'
import { Model, Schema, Document, Types } from 'mongoose'
import { AddressSchema } from './address'
import { PaginatedResult } from './pagination'

export enum Gender {
 MALE = 'MALE',
 FEMALE = 'FEMALE',
 TRANSGENDER = 'TRANSGENDER',
 NOT_SAY = 'RATHER NOT SAY'
}

export const StudentDetailsSchema = z.object({
 studentCode: z.string().optional()
})

export const PersonalInfoSchema = z.object({
 name: z.string().optional(),
 uniqueId: z.string().optional(),
 dob: z.string().optional(),
 mobile: z.string().optional(),
 email: z.string().optional(),
 gender: z.nativeEnum(Gender).optional(),
 address: z.array(AddressSchema).optional(),
 emailVerified: z.boolean().optional(),
 mobileVerified: z.boolean().optional(),
 profilePicture: z.any().optional() // Replace with Image schema if available
})

export const ClientInfoSchema = z.object({
 companyId: z.instanceof(Types.ObjectId).optional(),
 isClientRegistration: z.boolean().optional()
})

export const IUserSchema = z
 .object({
  roles: z.array(z.union([z.string(), z.any()])).optional(),
  isAdmin: z.boolean().optional(),
  lastLoggedIn: z.date().optional(),
  isAccountVerified: z.boolean().optional(),
  accountStatus: z.nativeEnum(AccountStatus).optional(),
  password: z.string().optional(),
  scopes: z.array(z.string()).optional(),
  isProfileComplete: z.boolean().optional(),
  deviceToken: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  signUpData: z.string().optional()
 })
 .merge(PersonalInfoSchema)
 .merge(StudentDetailsSchema)
 .merge(ClientInfoSchema)

export const CreateUserBodySchema = z.object({
 email: z.string(),
 mobile: z.string().optional(),
 password: z.string(),
 name: z.string(),
 roleId: z.string()
})

export const CompleteProfileSchema = z.object({
 profile: IUserSchema,
 enrollments: z.any().optional(), // Replace with PaginatedResult<IEnrollment> schema if available
 certificates: z.any().optional() // Replace with PaginatedResult<Certificate> schema if available
})

export const UserFilterSchema = z.object({
 userId: z.instanceof(Types.ObjectId).optional(),
 companyId: z.instanceof(Types.ObjectId).optional(),
 accountStatus: z.nativeEnum(AccountStatus).optional()
})

export type IUserKeys = keyof IUser
export type TransformedUser = {
 [key in IUserKeys]?: any
}
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
export interface IUserModel extends Model<IUser, object, IUserMethods> {
 isEmailTaken(email: string): Promise<boolean>
 isMobileTaken(mobile: string): Promise<boolean>
}

// Inferred Types
export type IAddress = z.infer<typeof AddressSchema>
export type StudentDetails = z.infer<typeof StudentDetailsSchema>
export type IPersonalInfo = z.infer<typeof PersonalInfoSchema>
export type ClientInfo = z.infer<typeof ClientInfoSchema>
export type IUser = z.infer<typeof IUserSchema> & Document
export type CreateUserBody = z.infer<typeof CreateUserBodySchema>
export type CompleteProfile = z.infer<typeof CompleteProfileSchema>
export type UserFilter = z.infer<typeof UserFilterSchema>
export type IUserAndMethods = IUser & IUserMethods
