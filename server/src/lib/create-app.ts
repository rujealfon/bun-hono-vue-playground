import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'

import { pinoLogger } from '@/middlewares/pino-logger'

import type { AppBindings } from './types'

export function createRouter() {
  return new OpenAPIHono<AppBindings>({ strict: false })
}

export default function createApp() {
  const app = createRouter()
  app.use(serveEmojiFavicon('📝'))
  app.use(pinoLogger())

  app.notFound(notFound)

  app.onError(onError)

  return app
}
