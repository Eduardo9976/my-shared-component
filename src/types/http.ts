import type { AxiosRequestConfig } from 'axios'

export interface RequestConfig extends AxiosRequestConfig {
  withToken?: boolean
}

export interface HttpOptions {
  withToken?: boolean
  baseURL?: string
}

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
}

export interface PaginatedResponse<T = unknown> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface HttpError {
  message: string
  status: number
  code?: string
  details?: unknown
}

// Common HTTP status codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503
}
