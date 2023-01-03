import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const ChatHeaders = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <View style={SS.container_wrapper}>
        <Text style={SS.container_text}>{t.get('chat_headers')}</Text>
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 18,
    paddingRight: 18,
    marginTop: 21,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderColor: '#333333'
  },
  container_wrapper: {
    width: '100%'
  },
  container_text: {
    color: '#99989E',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16
  }
})
