import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { useInject } from 'IoC'

import { Svg } from 'components/ui/Svg'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const MainFeedNewSideMind = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <Pressable style={SS.container}>
      <View style={SS.containerRight}>
        <Text style={SS.title}>Add another SideMind</Text>
        <Svg name={'PointerRight'} />
      </View>
    </Pressable>
  )
}

const SS = StyleSheet.create({
  container: {
    width: '100%',
    height: 77,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  containerRight: {
    paddingLeft: 18,
    paddingTop: 12,
    paddingRight: 18,
    paddingBottom: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    height: '100%'
  },
  title: {
    color: '#549EF7',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.4
  }
})
