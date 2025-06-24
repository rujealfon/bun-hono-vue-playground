import type { PinoLogger } from 'hono-pino'

import { OpenAPIHono } from '@hono/zod-openapi'
import { notFound, onError, serveEmojiFavicon } from 'stoker/middlewares'

import { pinoLogger } from '@/middlewares/pino-logger'

interface AppBindings {
  Variables: {
    logger: PinoLogger
  }
}

const app = new OpenAPIHono<AppBindings>()
app.use(serveEmojiFavicon('📝'))
app.use(pinoLogger())

app.get('/', (c) => {
  c.var.logger.warn('Hello Hono!')
  return c.text('Hello Hono!')
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.notFound(notFound)

app.onError(onError)

export default app
