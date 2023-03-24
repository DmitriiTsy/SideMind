import { IConfig } from 'react-native-rate'

import { globalConfig } from 'utils/config'

export const RATE_CONFIG: IConfig = {
  AppleAppID: globalConfig.APPLE_APP_ID,
  preferInApp: true
}
