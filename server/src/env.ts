import type { ZodError } from 'zod'

import { config } from 'dotenv'
import { expand } from 'dotenv-expand'
import { z } from 'zod'

expand(config())

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  SERVER_PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
})

export type env = z.infer<typeof envSchema>

// eslint-disable-next-line import/no-mutable-exports, ts/no-redeclare
let env: env

try {
  // eslint-disable-next-line no-restricted-syntax
  env = envSchema.parse(Bun.env)
}
catch (err) {
  const error = err as ZodError
  console.error('❌ Invalid env:')
  console.error(error.flatten().fieldErrors)
  process.exit(1)
}

export default env
