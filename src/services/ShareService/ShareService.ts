import { Share as NativeShare } from 'react-native'

import Share from 'react-native-share'

import { Inject, Injectable } from 'IoC'
import {
  ITinyUrlService,
  ITinyUrlServiceTId
} from 'services/TinyUrlService/TinyUrlService'
import { AvatarModel, EAvatarsCategory } from 'services/FirebaseService/types'
import { globalConfig } from 'utils/config'

export const IShareServiceTId = Symbol.for('IShareServiceTId')

export interface IShareService {
  shareAvatar(avatar: AvatarModel, onGetUrl?: () => void): void

  shareApp(): void
}

@Injectable()
export class ShareService implements IShareService {
  constructor(
    @Inject(ITinyUrlServiceTId) private readonly tinyUrlService: ITinyUrlService
  ) {}

  async shareAvatar(avatar: AvatarModel, onGetUrl?: () => void) {
    const tinyUrl = await this.tinyUrlService.getTinyUrl(
      avatar.id,
      avatar.name,
      avatar.uri,
      avatar.category !== EAvatarsCategory.Custom,
      avatar.category === EAvatarsCategory.Starting
    )

    onGetUrl && onGetUrl()

    await NativeShare.share({
      url: tinyUrl
    })
  }

  async shareApp() {
    await Share.open({
      url: globalConfig.APP_STORE_LINK
    })
  }
}
