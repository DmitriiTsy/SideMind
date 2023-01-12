import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid
} from 'services/LocalizationService/LocalizationService'
import { Svg } from 'components/ui/Svg'
import { INavigationService, INavigationServiceTid } from 'services'

import { CommonScreenName } from 'constants/screen.types'
import { IStorageService, IStorageServiceTid } from 'services/StorageService'

export const Boot = () => {
  const storage = useInject<IStorageService>(IStorageServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  useEffect(() => {
    setTimeout(() => {
      const value = storage.getUserLogin()
      navigation.navigate(CommonScreenName.SelectBots, {
        isStarting: true
      })
      // if (value) {
      //   navigation.navigate(CommonScreenName.MainFeed)
      // } else {
      //   navigation.navigate(CommonScreenName.SelectBots, {
      //     isStarting: true
      //   })
      // }
    }, 1000)
  })
  return (
    <View style={SS.container}>
      <Svg name={'Logo'} />
      <Text style={SS.title}>{t.get('sideMind')}</Text>
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
