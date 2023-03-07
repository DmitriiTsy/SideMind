import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

import { Linking } from 'react-native'

import {
  getActionFromState,
  NavigationState,
  PartialState
} from '@react-navigation/native'

import { CommonScreenName, CommonScreenParamsMap } from 'constants/screen.types'
import { Inject, Injectable } from 'IoC'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { INavigationService, INavigationServiceTid } from 'services'

export const IDeepLinkingServiceTid = Symbol.for('DeepLinkingServiceTid')

export interface IDeepLinkingService {
  linking: LinkingOptions<CommonScreenParamsMap>
}

@Injectable()
export class DeepLinkingService implements IDeepLinkingService {
  _navigationLinking: LinkingOptions<CommonScreenParamsMap> = {
    prefixes: ['sidemind://', 'https://sidemind-aa533.web.app'],
    config: {
      initialRouteName: CommonScreenName.MainFeed,
      screens: {
        // [CommonScreenName.MainFeed]: 'main-feed',
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
        return {
          type: 'NAVIGATE' as any,
          payload
        }
      }

      return getActionFromState(state, options)
    }
  }

  constructor(
    @Inject(IBottomPanelVMTid) private readonly _bottomPanelVM: IBottomPanelVM,
    @Inject(IAppStoreTid) private readonly _appStore: IAppStore,
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
    this._appStore.setAvatarsFromStorage()

    const initialURL = await Linking.getInitialURL()

    const interval = setInterval(() => {
      if (this._navigationService.isReady()) {
        this._navigationService.setParamsFromUrl(initialURL)
        clearInterval(interval)
      }
    }, 100)

    return initialURL
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
