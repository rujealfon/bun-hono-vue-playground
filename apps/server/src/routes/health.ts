import type { HealthResponse } from '@bun-hono-vue-playground/shared'
import {
  createSuccessResponse,
  formatDate,
} from '@bun-hono-vue-playground/shared'
import { Hono } from 'hono'

const health = new Hono()

health.get('/', (c) => {
  const healthResponse: HealthResponse = {
    status: 'ok',
    timestamp: formatDate(),
    version: '1.0.0',
  }

  return c.json(createSuccessResponse(healthResponse))
})

export { health as healthRoutes }
