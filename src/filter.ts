import { Types } from 'mongoose'

export interface GenericOptions<T> {
 filter: T
}

export type FilterAndOptions = GenericOptions<{
 userId?: Types.ObjectId
 companyId?: Types.ObjectId
}>
