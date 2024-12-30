import type { Schema, Types } from 'mongoose'
export interface Image {
 file?: string
 name: string
 alt?: string
 url?: string
}

export interface FileType {
 file?: string
 name: string
 url?: string
 alt?: string
}

export enum ActiveStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE'
}
export enum AccountStatus {
 INACTIVE = 'INACTIVE',
 ACTIVE = 'ACTIVE',
 SUSPENDED = 'SUSPENDED',
 BLOCKED = 'BLOCKED'
}
export interface ICommonFields {
 createdBy?: Types.ObjectId
 lastUpdatedBy?: Types.ObjectId
}
