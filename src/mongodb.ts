import { Types } from 'mongoose'
export type ObjectId = Types.ObjectId
export const idToString = (id: ObjectId | undefined | null | unknown) => {
 if (!id) {
  return ''
 }
 return id?.toString() || ''
}
// export const stringToId = (id: string) => new Types.ObjectId(id)
export function stringToId(idString?: string): Types.ObjectId {
 if (!idString) {
  throw new Error('Invalid ObjectId string')
 }
 if (!Types.ObjectId.isValid(idString)) {
  throw new Error('Invalid ObjectId string')
 }
 //  var mongoose = require('mongoose');
 return new Types.ObjectId(idString)
}

export function toId(id: Types.ObjectId): Types.ObjectId {
 return id as unknown as Types.ObjectId
}

export function getObjectId(): Types.ObjectId {
    return new Types.ObjectId();
}

export type MongoObjectId = Types.ObjectId;


