import * as HttpStatusCodes from '@rujealfon/stoker/http-status-codes'
import * as HttpStatusPhrases from '@rujealfon/stoker/http-status-phrases'
import { eq } from 'drizzle-orm'

import type { AppRouteHandler } from '@/lib/types'
import type { CreateRoute, GetOneRoute, ListRoute } from '@/routes/tasks/tasks.routes'

import db from '@/db'
import { tasks } from '@/db/schema'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  const tasks = await db.query.tasks.findMany()
  return c.json(tasks)
}

export const create: AppRouteHandler<CreateRoute> = async (c) => {
  const task = c.req.valid('json')
  const [inserted] = await db.insert(tasks).values(task).returning()
  return c.json(inserted, HttpStatusCodes.OK)
}

export const getOne: AppRouteHandler<GetOneRoute> = async (c) => {
  const { id } = c.req.valid('param')
  const task = await db.query.tasks.findFirst({
    where: eq(tasks.id, id),
  })

  if (!task) {
    return c.json({
      message: HttpStatusPhrases.NOT_FOUND,
    }, HttpStatusCodes.NOT_FOUND)
  }

  return c.json(task, HttpStatusCodes.OK)
}
