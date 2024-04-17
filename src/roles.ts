import type { Schema, Model } from 'mongoose'
export interface IRole {
  name: string
  description?: string
  slug: string
}

export interface IRoleModel extends Model<IRole> {
  getRoleIdsBySlug(slugArr: string[]): Promise<Schema.Types.ObjectId[]>
}
