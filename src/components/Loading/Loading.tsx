import React, { useEffect } from 'react'
import { StyleSheet, View } from 'react-native'


import range from 'lodash/range'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid
} from 'services/LocalizationService/LocalizationService'

import { INavigationService, INavigationServiceTid } from 'services'
import { ScreenContainer } from 'components/ScreenContainer'
import { CommonScreenName } from 'constants/screen.types'
import { LoadingHeader } from './components/LoadingHeader'

import { OneBot } from './components/OneBot'

export const Loading = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

//   useEffect(() => {
//     setTimeout(() => navigation.navigate(CommonScreenName.SelectBots), 3000)
//   })

  const header = () => (
    <View style={SS.header_container}>
      <View style={SS.header_text}></View>
    </View>
  )
  return (
    <ScreenContainer
      topInsetColor={'#1C1C1E'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <LoadingHeader />
      <View style={SS.pendingContainer}>
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} />
        ))}
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} />
        ))}
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} />
        ))}
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  header_container: {
    borderBottomColor: 'rgba(72, 72, 73, 0.3)',
    borderBottomWidth: 0.5,
    width: '100%',
    height: 45,
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  header_text: {
    backgroundColor: 'rgba(72, 72, 73, 0.3)',
    width: 130,
    height: 12,
    borderRadius: 25
  },
  title: {
    color: '#1C1C1E',
    fontWeight: '700',
    fontSize: 20
  },
  screenContainer: {
    backgroundColor: '#1C1C1E'
  },
  pendingContainer: {
    backgroundColor: '#1C1C1E',
    marginLeft: 14,
    marginVertical: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 18
  }
})
