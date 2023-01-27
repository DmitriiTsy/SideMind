import React, { useEffect } from 'react'

import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { StatusBar } from 'react-native'

import { StackAnimationTypes } from 'react-native-screens'

import { useInject } from 'IoC'

import {
  BootScreen,
  ChatScreen,
  MainFeedScreen,
  SelectBotsScreen
} from 'screens'
import { CommonScreenName, ScreenParamTypes } from 'constants/screen.types'

import { IAppVM, IAppVMTid } from 'app/App.vm'
import { BottomPanel } from 'components/BottomPanel'

const Stack = createNativeStackNavigator<ScreenParamTypes>()

const OPTS: { animation: StackAnimationTypes } = { animation: 'none' }
import {
  requestUserPermission,
  NotificationListner
} from '../../src/services/FirebaseService/FirebaseCloud'

export const App = () => {
  const appVM = useInject<IAppVM>(IAppVMTid)
  const navigationContainerRef = useNavigationContainerRef<ScreenParamTypes>()

  useEffect(() => {
    requestUserPermission()
    NotificationListner()
  }, [])

  useEffect(() => {
    appVM.init()
    appVM.initNavigation(navigationContainerRef)
  })

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <StatusBar translucent={true} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={CommonScreenName.Boot}
      >
        <Stack.Screen
          name={CommonScreenName.Boot}
          component={BootScreen}
          options={OPTS}
        />
        <Stack.Screen
          name={CommonScreenName.SelectAvatars}
          component={SelectBotsScreen}
          options={OPTS}
        />
        <Stack.Screen name={CommonScreenName.Chat} component={ChatScreen} />
        <Stack.Screen
          name={CommonScreenName.MainFeed}
          component={MainFeedScreen}
          options={OPTS}
        />
      </Stack.Navigator>
      <BottomPanel />
    </NavigationContainer>
  )
}
