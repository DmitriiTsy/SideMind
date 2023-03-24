import { Alert, Share } from 'react-native'

import { captureScreen } from 'react-native-view-shot'

import { AvatarModel, EAvatarsCategory } from 'services/FirebaseService/types'
import { ITinyUrlService } from 'services/TinyUrlService/TinyUrlService'

export const shareHandler = async (
  type: 'mind' | 'conv' | 'app',
  tinyUrlService: ITinyUrlService,
  avatar?: AvatarModel
) => {
  try {
    let shareUrl
    switch (type) {
      case 'mind':
        shareUrl = await tinyUrlService.getTinyUrl(
          avatar.id,
          avatar.name,
          avatar.uri,
          avatar.category !== EAvatarsCategory.Custom,
          avatar.category === EAvatarsCategory.Starting
        )
        break
      case 'conv':
        const uri = await captureScreen({
          format: 'jpg',
          quality: 0.8
        })
        shareUrl = uri
        break
      case 'app':
        shareUrl =
          'https://apps.apple.com/us/app/sidemind-personal-ai-chatbots/id1660825704'
    }

    const result = await Share.share({
      url: shareUrl
    })
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log(result.activityType)
      } else {
      }
    } else if (result.action === Share.dismissedAction) {
      console.log(result)
    }
  } catch (error: any) {
    Alert.alert(error.message)
  }
}
