import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid
} from 'services/LocalizationService/LocalizationService'

import { INavigationService, INavigationServiceTid } from 'services'

import { CommonScreenName } from 'constants/screen.types'

import range from 'lodash/range'

import { OneBot } from './components/OneBot'

export const Loading = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  useEffect(() => {
    setTimeout(() => navigation.navigate(CommonScreenName.SelectBots), 5000)
  })
  return (
    <View style={SS.pendingContainer}>
      {range(3).map((_, index) => (
        <OneBot key={index} />
      ))}
      {range(4).map((_, index) => (
        <OneBot key={index} />
      ))}
      {range(3).map((_, index) => (
        <OneBot key={index} />
      ))}
      {range(4).map((_, index) => (
        <OneBot key={index} />
      ))}
      {range(6).map((_, index) => (
        <OneBot key={index} />
      ))}
    </View>
  )
}

const SS = StyleSheet.create({
  title: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 20
  },
  pendingContainer: {
    height: 38,
    width: 40,
    backgroundColor: '#363637',
    marginLeft: 14,
    marginVertical: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
