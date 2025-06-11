import type { Model, Types } from 'mongoose'
export interface IRole {
 name: string
 description?: string
 slug: string
}

export interface IRoleModel extends Model<IRole> {
 getRoleIdsBySlug(slugArr: string[]): Promise<Types.ObjectId[]>
}

export type RoleDefinitionValue = {
 _id: string
 name: string
 slug: string
}
export interface IRoleDefinitions {
 role_admin: RoleDefinitionValue
 role_student: RoleDefinitionValue
 role_instructor: RoleDefinitionValue
 role_candidate: RoleDefinitionValue
 role_interviewer: RoleDefinitionValue
}

export type RoleNames = keyof IRoleDefinitions

export const roleDefinitions: IRoleDefinitions = {
 role_admin: {
  _id: '650acb6e752c4489ac85815f',
  name: 'admin',
  slug: 'role_admin'
 },
 role_student: {
  _id: '650acb6e752c4489ac858160',
  name: 'student',
  slug: 'role_student'
 },
 role_instructor: {
  _id: '650acb6e752c4489ac858161',
  name: 'instructor',
  slug: 'role_instructor'
 },
 role_candidate: {
    _id: '67a49aded1fe941bfdc58e21',
    name: 'candidate',
    slug: 'role_candidate'
 },
 role_interviewer: {
    _id: '67a49b197ce2358861766102',
    name: 'interviewer',
    slug: 'role_interviewer'
 }
}

export interface RoleQueryFilter {
 role?: string
}
