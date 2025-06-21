import type { Context, ErrorHandler, NotFoundHandler } from 'hono'
import {
  createErrorResponse,
  HTTP_STATUS,
} from '@bun-hono-vue-playground/shared'

export const notFoundHandler: NotFoundHandler = (c: Context) => {
  return c.json(
    createErrorResponse('Endpoint not found'),
    HTTP_STATUS.NOT_FOUND,
  )
}

export const errorHandler: ErrorHandler = (err: Error, c: Context) => {
  console.error('Server error:', err)
  return c.json(
    createErrorResponse('Internal server error'),
    HTTP_STATUS.INTERNAL_SERVER_ERROR,
  )
}
