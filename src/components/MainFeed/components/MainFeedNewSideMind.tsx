import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

import { useInject } from 'IoC'

import { Svg } from 'components/ui/Svg'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const MainFeedNewSideMind = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <Pressable style={SS.container}>
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
