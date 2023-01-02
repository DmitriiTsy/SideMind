import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationServiceVM,
  ILocalizationServiceVMTid
} from 'services/LocalizationService/LocalizationService'
import { Svg } from 'components/ui/Svg'
import { INavigationServiceVM, INavigationServiceVMTid } from 'services'

import { CommonScreenName } from '../../constants/screen.types'

export const Boot = () => {
  const t = useInject<ILocalizationServiceVM>(ILocalizationServiceVMTid)
  const navigation = useInject<INavigationServiceVM>(INavigationServiceVMTid)
  useEffect(() => {
    setTimeout(() => navigation.navigate(CommonScreenName.Main), 1000)
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
    color: 'white'
  }
})
