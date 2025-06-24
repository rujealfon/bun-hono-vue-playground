import { Scalar } from '@scalar/hono-api-reference'

import type { AppOpenAPI } from '@/lib/types'

import packageJSON from '../../package.json'

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      title: 'Tasks API',
      version: packageJSON.version,
    },
  })

  app.get('/reference', Scalar({
    theme: 'deepSpace',
    layout: 'classic',
    defaultHttpClient: {
      targetKey: 'js',
      clientKey: 'fetch',
    },
    spec: {
      url: '/doc',
    },
  }))
}
