import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid
} from 'services/LocalizationService/LocalizationService'

import { Svg } from 'components/ui/Svg'
import { INavigationService, INavigationServiceTid } from 'services'

import { CommonScreenName } from 'constants/screen.types'

import { OneBot } from './components/OneBot'

export const Loading = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  useEffect(() => {
    setTimeout(() => navigation.navigate(CommonScreenName.SelectBots), 3000)
  })
  return (
    <View style={SS.container}>
      <OneBot />
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20
  }
})
