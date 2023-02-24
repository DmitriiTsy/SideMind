import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

import { Linking } from 'react-native'

import { CommonScreenName, CommonScreenParamsMap } from 'constants/screen.types'
import { Inject, Injectable } from 'IoC'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'

export const IDeepLinkingServiceTid = Symbol.for('DeepLinkingServiceTid')

export interface IDeepLinkingService {
  linking: LinkingOptions<CommonScreenParamsMap>
}

@Injectable()
export class DeepLinkingService implements IDeepLinkingService {
  _navigationLinking: LinkingOptions<CommonScreenParamsMap> = {
    prefixes: ['sidemind://', 'https://sidemind-aa533.web.app'],
    config: {
      initialRouteName: CommonScreenName.Boot,
      screens: {
        [CommonScreenName.MainFeed]: 'main-feed',
        [CommonScreenName.Chat]: 'chat/:dID/:bID'
      }
    }
  }

  constructor(
    @Inject(IBottomPanelVMTid) private readonly _bottomPanelVM: IBottomPanelVM
  ) {}

  get linking(): LinkingOptions<CommonScreenParamsMap> {
    return {
      ...this._navigationLinking,
      subscribe: this._subscribe
    }
  }

  private _subscribe = (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      this._bottomPanelVM.closePanel()
      return listener(url)
    }

    const emitter = Linking.addEventListener('url', onReceiveURL)

    return () => emitter.remove()
  }
}
