/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { bootstrapper } from './src/bootstrapper'
import 'react-native-url-polyfill/auto'
import messaging from '@react-native-firebase/messaging'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log('Message handled in the background!', remoteMessage)
})
const app = bootstrapper()
AppRegistry.registerComponent(appName, () => app)
