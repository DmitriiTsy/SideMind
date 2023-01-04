import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const ChatBottom = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <Pressable>
        <Text style={SS.activeText}>Something important</Text>
      </Pressable>

      <View>
        <Text style={SS.title}></Text>
        <Text style={SS.counter}>0/22</Text>
      </View>

      <Pressable>
        <Text style={[SS.activeText, SS.inactiveText]}></Text>
      </Pressable>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12
  },
  activeText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    marginHorizontal: 18
  },
  inactiveText: {
    color: '#484849'
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center'
  },
  counter: {
    fontWeight: '400',
    fontSize: 11,
    color: '#FFFFFF',
    textAlign: 'center'
  }
})
