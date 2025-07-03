import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '@rujealfon/stoker/http-status-codes'
import { jsonContent, jsonContentRequired } from '@rujealfon/stoker/openapi/helpers'
import { createErrorSchema } from '@rujealfon/stoker/openapi/schemas'

import { insertTasksSchema, selectTasksSchema } from '@/db/schema'

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

export type ListRoute = typeof list
export type CreateRoute = typeof create
