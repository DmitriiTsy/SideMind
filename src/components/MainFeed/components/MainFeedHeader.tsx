import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { Svg } from 'components/ui/Svg'

export const MainFeedHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <View style={SS.falseElement}></View>
      <View style={SS.titleContainer}>
        <Svg name={'Logo'} />
        <Text style={SS.title}>SideMind</Text>
      </View>
      <Pressable style={SS.addNote}>
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  addNote: {
    paddingRight: 7.5
  },
  falseElement: {
    width: 20,
    height: 20,
    paddingLeft: 7.5
  }
})
