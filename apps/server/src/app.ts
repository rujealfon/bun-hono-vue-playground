import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'

import { errorHandler, notFoundHandler } from './middleware/error.js'
import { healthRoutes } from './routes/health.js'
import { taskRoutes } from './routes/tasks.js'

const app = new Hono()

// Middleware
app.use(
  '*',
  cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true,
  }),
)
app.use('*', logger())
app.use('*', prettyJSON())

// Routes
app.route('/api/health', healthRoutes)
app.route('/api/tasks', taskRoutes)

// Error handling
app.notFound(notFoundHandler)
app.onError(errorHandler)

export default app
