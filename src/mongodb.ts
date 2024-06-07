import { Schema } from 'mongoose';
export type ObjectId = Schema.Types.ObjectId;
export const idToString = (id: ObjectId) => id.toString();
export const stringToId = (id: string) => new Schema.Types.ObjectId(id);
