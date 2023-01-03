import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const ChatHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <View style={SS.container_border}>
        <Text style={SS.title}>{t.get('chat_headers')}</Text>
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    paddingLeft: 18,
    paddingTop: 21,
    paddingBottom: 8,
    width: '100%',
    backgroundColor: '#1C1C1E'
  },
  container_border: {
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    paddingBottom: 8
  },
  title: {
    color: '#99989E',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16
  }
})
