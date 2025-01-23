import { Request } from 'express'
import { IUserAndMethods } from './user'

export interface RequestWithUser extends Request {
 user?: IUserAndMethods
}

export enum HttpHeaderPath {
    CLIENT_KEY = 'client-key'
}
