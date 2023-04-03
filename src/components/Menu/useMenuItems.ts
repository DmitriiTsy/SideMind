import { Linking } from 'react-native'
import Rate from 'react-native-rate'

import { globalConfig } from 'utils/config'
import { RATE_CONFIG } from 'constants/rateConfig'
import { SVG_MAP } from 'components/ui/Svg/constants'
import { useInject } from 'IoC'
import { IShareService, IShareServiceTId } from 'services/ShareService'

export interface IMenuItem {
  icon: keyof typeof SVG_MAP
  text: string
  onPress: () => void
}

export const useMenuItems = () => {
  const shareService = useInject<IShareService>(IShareServiceTId)

  const socialMedia: IMenuItem[] = [
    {
      icon: 'Discord',
      text: 'Join our Discord',
      onPress: () => Linking.openURL(globalConfig.DISCORD_URL)
    },
    {
      icon: 'Twitter',
      text: 'Follow Us on Twitter',
      onPress: () => Linking.openURL(globalConfig.TWITTER_URL)
    }
  ]

  const mainItems: IMenuItem[] = [
    {
      icon: 'Share',
      text: 'Share with Friends',
      onPress: () => shareService.shareApp()
    },
    {
      icon: 'Rate',
      text: 'Rate Us',
      onPress: () => Rate.rate({ ...RATE_CONFIG, inAppDelay: 1.5 })
    },
    {
      icon: 'Feedback',
      text: 'Send Feedback',
      onPress: () => Linking.openURL(globalConfig.FEEDBACK_URL)
    },
    {
      icon: 'About',
      text: 'About SideMind',
      onPress: () => Linking.openURL(globalConfig.ABOUT_URL)
    },
    {
      icon: 'TermsAndConditions',
      text: 'Terms and conditions',
      onPress: () => Linking.openURL(globalConfig.TERMS_CONDITIONS)
    },
    {
      icon: 'PrivacyPolicy',
      text: 'Privacy policy',
      onPress: () => Linking.openURL(globalConfig.PRIVACY)
    }
  ]

  return {
    socialMedia,
    mainItems
  }
}
