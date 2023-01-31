import React from 'react'
import { Pressable, StyleSheet, View, Text } from 'react-native'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const CardHeader = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  return (
    <View style={SS.container}>
      <Pressable>
        <Text style={SS.text}>{t.get('cancel')}</Text>
      </Pressable>
      <Text style={SS.text}>{t.get('mind info')}</Text>
      <Pressable>
        <Text style={SS.text}>{t.get('save')}</Text>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    color: '#FFFFFF'
  }
})
