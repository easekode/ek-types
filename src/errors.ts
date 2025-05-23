export interface IApiError {
    message: string;
    status?: number;
    errors?: unknown | unknown[];
    errorCode?: string;
    source?: string;
    error?: unknown;
    isPublic?: boolean;
    stack?: string;
}

export interface FeParsedError {
    status: number;
    statusText: string;
    data: any;
    message: string;
}

export interface HandleErrorResult {
    error: FeParsedError
  }