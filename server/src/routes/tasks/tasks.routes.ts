import { createRoute, z } from '@hono/zod-openapi'
import * as HttpStatusCodes from '@rujealfon/stoker/http-status-codes'
import { jsonContent } from '@rujealfon/stoker/openapi/helpers'

const tags = ['Tasks']

export const list = createRoute({
  tags,
  method: 'get',
  path: '/tasks',
  responses: {
    [HttpStatusCodes.OK]: jsonContent(
      z.array(z.object({
        name: z.string(),
        done: z.boolean(),
      })),
      'The list of tasks',
    ),
  },
})

export type ListRoute = typeof list
