import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const SelectBotsHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <Pressable>
        <Text style={SS.activeText}></Text>
      </Pressable>

      <View>
        <Text style={SS.title}>Choose 3 to start</Text>
        <Text style={SS.counter}>You can add more later</Text>
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
    height: 52,
    justifyContent: 'space-between',
    alignItems: 'center',

    backgroundColor: '#303030',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
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
