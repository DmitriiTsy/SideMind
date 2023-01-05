import React, { useCallback } from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

import { useInject } from 'IoC'

import { Svg } from 'components/ui/Svg'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { INavigationService, INavigationServiceTid } from 'services'

import { CommonScreenName } from 'constants/screen.types'

export const MainFeedNewSideMind = () => {
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  const onPress = useCallback(() => {
    navigation.navigate(CommonScreenName.SelectBots)
  }, [navigation])

  return (
    <Pressable style={SS.container} onPress={onPress}>
      <Text style={SS.title}>Add another SideMind</Text>
      <Svg name={'PointerRight'} />
    </Pressable>
  )
}

const SS = StyleSheet.create({
  container: {
    height: 77,
    width: '100%',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#333333'
  },
  title: {
    color: '#549EF7',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.4
  }
})
