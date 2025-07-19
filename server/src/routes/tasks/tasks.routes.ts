import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '@rujealfon/stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from '@rujealfon/stoker/openapi/helpers'
import { createErrorSchema, IdParamsSchema } from '@rujealfon/stoker/openapi/schemas'

import { insertTasksSchema, patchTasksSchema, selectTasksSchema } from '@/db/schema'
import { notFoundSchema } from '@/lib/constants'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  method: 'get',
  path: '/tasks',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(selectTasksSchema),
      'The list of tasks',
    ),
  },
})

export const create = createRoute({
  tags,
  method: 'post',
  path: '/tasks',
  request: {
    body: jsonContentRequired(insertTasksSchema, 'The task to create'),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'The created task',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(insertTasksSchema),
      'The task to create is invalid',
    ),
  },
})

export const getOne = createRoute({
  tags,
  method: 'get',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'The requested task',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error',
    ),
  },
})

export const patch = createRoute({
  tags,
  method: 'patch',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
    body: jsonContentRequired(
      patchTasksSchema,
      'The task updates',
    ),
  },
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      selectTasksSchema,
      'The updated task',
    ),
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(patchTasksSchema)
        .or(createErrorSchema(IdParamsSchema)),
      'The validation error(s)',
    ),
  },
})

export const remove = createRoute({
  tags,
  method: 'delete',
  path: '/tasks/{id}',
  request: {
    params: IdParamsSchema,
  },
  responses: {
    [HttpStatusCodes.NO_CONTENT]: {
      description: 'The task was deleted',
    },
    [HttpStatusCodes.NOT_FOUND]: jsonContent(
      notFoundSchema,
      'Task not found',
    ),
    [HttpStatusCodes.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      'Invalid id error',
    ),
  },
})

export type ListRoute = typeof list
export type CreateRoute = typeof create
export type GetOneRoute = typeof getOne
export type PatchRoute = typeof patch
export type RemoveRoute = typeof remove
