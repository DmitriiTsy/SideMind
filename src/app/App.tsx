import React, { useEffect } from 'react'

import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'

import { StatusBar } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import { useInject } from 'IoC'

import {
  BootScreen,
  ChatScreen,
  MainFeedScreen,
  SelectBotsScreen,
  MenuScreen
} from 'screens'
import { CommonScreenName, ScreenParamTypes } from 'constants/screen.types'

import { IAppVM, IAppVMTid } from 'app/App.vm'
import { BottomPanel } from 'components/BottomPanel'
import { Blur } from 'components/Blur'

const Stack = createStackNavigator<ScreenParamTypes>()

const OPTS = { animationEnabled: false }

export const App = () => {
  const appVM = useInject<IAppVM>(IAppVMTid)
  const navigationContainerRef = useNavigationContainerRef<ScreenParamTypes>()

  useEffect(() => {
    appVM.init()
    appVM.initNavigation(navigationContainerRef)
  }, [])

  return (
    <NavigationContainer
      ref={navigationContainerRef}
      onReady={appVM.onReady}
      linking={appVM.deeplink.linking}
      onStateChange={appVM.emitNavigationStateChange}
    >
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
        <Stack.Screen
          name={CommonScreenName.Menu}
          component={MenuScreen}
          options={{
            gestureDirection: 'horizontal-inverted'
          }}
        />
        <Stack.Screen name={CommonScreenName.Chat} component={ChatScreen} />
        <Stack.Screen
          name={CommonScreenName.MainFeed}
          component={MainFeedScreen}
          options={OPTS}
        />
      </Stack.Navigator>
      <BottomPanel />
      <Blur />
    </NavigationContainer>
  )
}
