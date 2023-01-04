import React from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import { useInject } from 'IoC'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const InChatPreview = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <Pressable style={SS.container}>
      <View style={SS.avatarContainer}>
        <Image source={require('assets/AvatarTest2.png')} />
      </View>
      <View style={SS.containerRight}>
        <Text style={SS.botName}>{t.get('chat_preview_header')}</Text>
        <Text style={SS.botDesc}>{t.get('chat_preview_text')}</Text>
      </View>
    </Pressable>
  )
}

const SS = StyleSheet.create({
  container: {
    width: '100%',
    height: 77,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 18
  },
  containerRight: {
    alignItems: 'flex-start',
    paddingTop: 12,
    flex: 1,
    borderTopWidth: 0.5,
    borderColor: '#333333',
    height: '100%'
  },
  avatarContainer: {
    height: '100%',
    marginRight: 14,
    paddingTop: 12
  },
  botName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.4
  },
  botDesc: {
    color: '#7D7D82',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0.4
  }
})
