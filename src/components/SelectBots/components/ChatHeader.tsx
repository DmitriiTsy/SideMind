import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const ChatHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <Text style={SS.title}>{t.get('chat_headers')}</Text>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    marginLeft: 18,
    marginTop: 21,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    width: '100%'
  },
  title: {
    color: '#99989E',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16
  }
})
