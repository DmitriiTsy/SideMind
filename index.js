/**
 * @format
 */

import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { bootstrapper } from './src/bootstrapper'
import 'react-native-url-polyfill/auto'

const app = bootstrapper()
AppRegistry.registerComponent(appName, () => app)
