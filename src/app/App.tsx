import React, { useEffect } from 'react'

import {
  NavigationContainer,
  useNavigationContainerRef
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { StatusBar } from 'react-native'

import { useInject } from 'IoC'
import { IAppVM, IAppVMTid } from 'app'

import { BootScreen, HomeScreen } from 'screens'

import { CommonScreenName, ScreenParamTypes } from '../constants/screen.types'

const Stack = createNativeStackNavigator<ScreenParamTypes>()

export const App = () => {
  const appVM = useInject<IAppVM>(IAppVMTid)
  const navigationContainerRef = useNavigationContainerRef<ScreenParamTypes>()

  useEffect(() => {
    appVM.initNavigation(navigationContainerRef)
  })

  return (
    <NavigationContainer ref={navigationContainerRef}>
      <StatusBar translucent={true} barStyle={'light-content'} />
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={CommonScreenName.Boot}
      >
        <Stack.Screen name={CommonScreenName.Boot} component={BootScreen} />
        <Stack.Screen name={CommonScreenName.Home} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
