import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app
