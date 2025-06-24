import app from '@/app'

// eslint-disable-next-line node/no-process-env
const port = process.env.PORT || 3000

export default {
  port,
  fetch: app.fetch,
}
