import React, { useEffect } from 'react'

import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'

import { StatusBar } from 'react-native'

import { createDrawerNavigator } from '@react-navigation/drawer'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { StackAnimationTypes } from 'react-native-screens'

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

const Stack = createNativeStackNavigator<ScreenParamTypes>()

// const OPTS = { animationEnabled: false }
const OPTS: { animation: StackAnimationTypes } = { animation: 'none' }

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
        <Stack.Screen name={CommonScreenName.Chat} component={ChatScreen} />
        <Stack.Screen
          name={CommonScreenName.Drawer}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
      <BottomPanel />
      <Blur />
    </NavigationContainer>
  )
}

const Drawer = createDrawerNavigator()
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: {
          borderRightWidth: 1,
          borderRightColor: '#333333'
        },
        headerShown: false,
        overlayColor: 'transparent'
      }}
      initialRouteName={CommonScreenName.MainFeed}
      drawerContent={() => <MenuScreen />}
    >
      <Drawer.Screen
        name={CommonScreenName.MainFeed}
        component={MainFeedScreen}
      />
    </Drawer.Navigator>
  )
}
