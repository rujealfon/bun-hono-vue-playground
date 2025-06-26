import type { AppRouteHandler } from '@/lib/types'
import type { ListRoute } from '@/routes/tasks/tasks.routes'

export const list: AppRouteHandler<ListRoute> = async (c) => {
  return c.json([
    {
      name: 'Task 1',
      done: false,
    },
  ])
}
