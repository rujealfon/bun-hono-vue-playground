import * as HttpStatusPhrases from '@rujealfon/stoker/http-status-phrases'
import { createMessageObjectSchema } from '@rujealfon/stoker/openapi/schemas'

export const notFoundSchema = createMessageObjectSchema(HttpStatusPhrases.NOT_FOUND)
