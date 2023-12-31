import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

import { Linking } from 'react-native'

import {
  CommonActions,
  getActionFromState,
  NavigationState,
  PartialState
} from '@react-navigation/native'

import dynamicLinks from '@react-native-firebase/dynamic-links'

import { CommonScreenName, CommonScreenParamsMap } from 'constants/screen.types'
import { Inject, Injectable } from 'IoC'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { globalConfig } from 'utils/config'
import { INavigationService, INavigationServiceTid } from 'services'

export const IDeepLinkingServiceTid = Symbol.for('DeepLinkingServiceTid')

export interface IDeepLinkingService {
  linking: LinkingOptions<CommonScreenParamsMap>
}

@Injectable()
export class DeepLinkingService implements IDeepLinkingService {
  _navigationLinking: LinkingOptions<CommonScreenParamsMap> = {
    prefixes: [
      'sidemind://',
      globalConfig.SIDEMIND_URL,
      globalConfig.DYNAMIC_LINK_BASE_URL
    ],
    config: {
      initialRouteName: CommonScreenName.MainFeed,
      screens: {
        [CommonScreenName.MainFeed]: 'main-feed',
        [CommonScreenName.Chat]: {
          path: 'chat/:bID/:general/:starting',
          parse: {
            bID: (bID) => bID,
            general: (general) => /^true$/i.test(general),
            starting: (starting) => /^true$/i.test(starting)
          }
        }
      }
    },
    getActionFromState(state: PartialState<NavigationState>, options) {
      const route = state.routes[state.index ?? state.routes.length - 1]
      const payload = route
        ? { name: route.name, params: route.params }
        : undefined

      if (CommonScreenName.Chat === payload.name) {
        return CommonActions.reset({
          index: 1,
          routes: [
            { name: CommonScreenName.MainFeed },
            { name: CommonScreenName.Chat, params: payload.params }
          ]
        })
      }

      return getActionFromState(state, options)
    }
  }

  constructor(
    @Inject(IBottomPanelVMTid) private readonly _bottomPanelVM: IBottomPanelVM,
    @Inject(INavigationServiceTid)
    private readonly _navigationService: INavigationService
  ) {}

  get linking(): LinkingOptions<CommonScreenParamsMap> {
    return {
      ...this._navigationLinking,
      subscribe: this._subscribe,
      getInitialURL: this._getInitialURL
    }
  }

  private _getInitialURL = async () => {
    const initialURL = await Linking.getInitialURL()
    const dynamic = await dynamicLinks().getInitialLink()

    if (initialURL?.startsWith(globalConfig.DYNAMIC_LINK_BASE_URL)) {
      const link = this._handleDynamicLink(initialURL)

      const interval = setInterval(() => {
        if (this._navigationService.isReady()) {
          this._navigationService.setParamsFromUrl(link)
          clearInterval(interval)
        }
      }, 100)

      return link
    } else if (dynamic?.url) {
      const interval = setInterval(() => {
        if (this._navigationService.isReady()) {
          this._navigationService.setParamsFromUrl(dynamic.url)
          clearInterval(interval)
        }
      }, 100)
    }

    return initialURL || dynamic?.url || null
  }

  private _subscribe = (listener: (url: string) => void) => {
    const onReceiveURL = ({ url }: { url: string }) => {
      this._bottomPanelVM.closePanel()

      if (url.startsWith(globalConfig.DYNAMIC_LINK_BASE_URL)) {
        return listener(this._handleDynamicLink(url))
      }

      return listener(url)
    }

    const emitter = Linking.addEventListener('url', onReceiveURL)

    return () => emitter.remove()
  }

  private _handleDynamicLink = (link: string) => {
    let formattedLink = link.replace(
      `${globalConfig.DYNAMIC_LINK_BASE_URL}/?link=`,
      ''
    )
    const index = formattedLink.indexOf('&')
    formattedLink = formattedLink.slice(0, index)
    return formattedLink
  }
}
