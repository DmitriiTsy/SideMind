import axios from 'axios'

import { globalConfig } from 'utils/config'
import { Injectable } from 'IoC'

export const ITinyUrlServiceTId = Symbol.for('ITinyUrlServiceTId')

export interface ITinyUrlService {
  getTinyUrl(
    avatarId: string | number,
    avatarName: string,
    avatarImage: string,
    defaultAvatar: boolean,
    startingAvatar: boolean
  ): Promise<string>
}

@Injectable()
export class TinyUrlService implements ITinyUrlService {
  async getTinyUrl(
    avatarId: string | number,
    avatarName: string,
    avatarImage: string,
    defaultAvatar: boolean,
    startingAvatar: boolean
  ) {
    const { TINY_URL, TINY_URL_API_KEY, SIDEMIND_URL, TINY_URL_API } =
      globalConfig

    const res = await axios.post(
      `${TINY_URL_API}/create`,
      {
        url: `${SIDEMIND_URL}/?bID=${avatarId}&dF=${defaultAvatar}&sA=${startingAvatar}&name=${avatarName}&image=${avatarImage}`
      },
      {
        headers: {
          Authorization: TINY_URL_API_KEY
        }
      }
    )
    const id = res.data.data.tiny_url.replace(`${TINY_URL}/`, '')
    return `${SIDEMIND_URL}/?id=${id}`
  }
}
