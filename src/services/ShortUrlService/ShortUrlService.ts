import axios from 'axios'

import { Inject, Injectable } from 'IoC'
import { IFirebaseService, IFirebaseServiceTid } from 'services/FirebaseService'
import { IAppStore, IAppStoreTid } from 'store/AppStore'

export const IShortUrlServiceTid = Symbol.for('IShortUrlServiceTid')

export interface IShortUrlService {
  sendLongUrl(): void
  shortUrl: string
  shortUrlDomain: string
  shortUrlAlias: string
}

@Injectable()
export class ShortUrlService implements IShortUrlService {
  private _config: string
  configurationObject: { method: string; url: string }

  constructor(
    @Inject(IFirebaseServiceTid)
    private readonly _firebaseService: IFirebaseService,
    @Inject(IAppStoreTid) private readonly _appStore: IAppStore
  ) {}
  shortUrlDomain: string
  shortUrlAlias: string
  shortUrl: string

  sendLongUrl() {
    axios.defaults.headers.common[
      'Authorization'
    ] = `Bearer Rm7eJ0B0QAFX8YA5zSaLOJJ37r605NsJ35pcxyuHoqgP1iov6i3Nrx0n8iI2`;
    axios
      .post('https://api.tinyurl.com/create', {
        url: 'https://sidemind.app/?dID=15AE492A-8591-4F51-ADF5-9D699E53CBA5&bID=61b72bdd-422f-45b0-b27-a4ssbb94c9dbc&name=Nick' //should be dynamic
        // tags: 'example,link'
      })
      .then((response) => {
        this.shortUrl = response.data.data.tiny_url
        this.shortUrlAlias = this.shortUrl.replace('https://tinyurl.com/', '')
        this.shortUrlDomain = new URL(this.shortUrl).hostname
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }
}
