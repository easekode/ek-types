import { Model, PipelineStage } from 'mongoose';
import { QueryStringType } from './pagination';

export interface RequestInput {
  query?: QueryStringType;
  body?: any;
  params?: Record<string, any>;
  user?: any;
}

export interface GetAggregateResultInput {
  params?: QueryStringType;
  searchFields?: string[];
  lookupWithProject?: PipelineStage[];
  Service: Model<any>;
  additionalFilters?: PipelineStage[];
  mainPipeline?: PipelineStage[];
}

export type GetOneAggregateInput = {
  keyName?: string;
  paramKey?: string;
} & Omit<GetAggregateResultInput, 'searchFields' | 'additionalFilters'>;

export interface AggregateResultResponse {
  totalResult: number;
  data: any[];
}

export interface IGetPipeline {
  params: QueryStringType;
  lookupWithProject: PipelineStage[];
  searchFields: string[];
  additionalFilters: PipelineStage[];
}

export interface IGetPipelineResult {
  customPipeline: PipelineStage[];
  defaultPipeline: PipelineStage[];
}
