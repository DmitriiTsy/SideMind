import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
const OPENAI_KEY = defineSecret('OPENAI_KEY')

// get sidemind env from cloud secrete manager
//other env for the project can stored in secrete manager and pull to setup env on run time
exports.sideMindCredentials = onRequest(
  {
    secrets: [OPENAI_KEY],
    timeoutSeconds: 500,
    memory: '1GiB'
  },
  async (request, response): Promise<void> => {
    try {
      response.send({
        OPENAI_KEY: OPENAI_KEY.value()
      })
    } catch (e: any) {
      throw { message: e.message ?? 'internal server error' }
    }
  }
)
