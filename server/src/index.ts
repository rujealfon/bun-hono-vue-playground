import app from '@/app'
import env from '@/env'

const port = env.SERVER_PORT

export default {
  port,
  fetch: app.fetch,
}
