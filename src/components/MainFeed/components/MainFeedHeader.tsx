import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { Svg } from 'components/ui/Svg'

export const MainFeedHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <View style={SS.false_element}></View>
      <View style={SS.title_container}>
        <Svg name={'WhiteLogo'} />
        <Text style={SS.title}>SideMind</Text>
      </View>
      <Pressable style={SS.add_note}>
        <Svg name={'AddNote'} />
      </Pressable>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginTop: 12,
    backgroundColor: '#000000',
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.15,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingLeft: 10.5
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  add_note: {
    paddingRight: 7.5
  },
  false_element: {
    width: 20,
    height: 20,
    paddingLeft: 7.5
  }
})
