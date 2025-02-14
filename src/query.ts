import { Model, PipelineStage } from 'mongoose'
import { QueryStringType } from './pagination'
import { IUser } from './user'
import { IncomingHttpHeaders } from 'http'
import { ICompany } from './company'

export interface RequestInput<T = null> {
 //   query?: QueryStringType
 query?: Record<string, any> & { filter?: string }
 body?: T
 params?: Record<string, any>
 user?: IUser
 headers?: IncomingHttpHeaders
 company?: ICompany
}

export interface GetAggregateResultInput {
 params?: QueryStringType
 searchFields?: string[]
 lookupWithProject?: PipelineStage[]
 Service: Model<any>
 mainPipeline?: PipelineStage[]
}

export type GetOneAggregateInput = {
 keyName?: string
 paramKey?: string
} & Omit<GetAggregateResultInput, 'searchFields' | 'additionalFilters'>

export interface AggregateResultResponse {
 totalResult: number
 data: any[]
}

export interface IGetPipeline {
 params: QueryStringType
 lookupWithProject: PipelineStage[]
 searchFields: string[]
 additionalFilters: PipelineStage[]
}

export interface IGetPipelineResult {
 customPipeline: PipelineStage[]
 defaultPipeline: PipelineStage[]
}

export type CompositeApiProjectionValue = 1 | 0;
export interface CompositeApiProjection {
  courses?: CompositeApiProjectionValue;
  batches?: CompositeApiProjectionValue;
}
