import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

import { CommonScreenName, CommonScreenParamsMap } from 'constants/screen.types'
import { Injectable } from 'IoC'

export const IDeepLinkingServiceTid = Symbol.for('DeepLinkingServiceTid')

export interface IDeepLinkingService {
  linking: LinkingOptions<CommonScreenParamsMap>
}

@Injectable()
export class DeepLinkingService implements IDeepLinkingService {
  _navigationLinking: LinkingOptions<CommonScreenParamsMap> = {
    prefixes: ['sidemind://'],
    config: {
      initialRouteName: CommonScreenName.Boot,
      screens: {
        [CommonScreenName.MainFeed]: 'mainFeed'
      }
    }
  }

  get linking() {
    return {
      ...this._navigationLinking
    }
  }
}
