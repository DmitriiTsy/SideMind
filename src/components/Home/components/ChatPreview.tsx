import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { useInject } from 'IoC'
import {
  ILocalizationServiceVM,
  ILocalizationServiceVMTid
} from 'services/LocalizationService/LocalizationService'

import { Svg } from 'components/ui/Svg'

export const ChatPreview = () => {
  const t = useInject<ILocalizationServiceVM>(ILocalizationServiceVMTid)

  return (
    <View style={SS.container}>
      <Text style={SS.title}>hjhjjkjkjk</Text>
      <Text style={SS.title}>{t.get('sideMind')}</Text>
      <Text style={SS.title}>{t.get('chat_preview_text')}</Text>
      <Text style={SS.title}>{t.get('chat_preview_header')}</Text>
      <Svg name={'Logo'} />
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: 'white'
  }
})
