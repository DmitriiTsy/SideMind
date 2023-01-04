import React from 'react'
import { Pressable, StyleSheet, Text, View, Image } from 'react-native'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { Svg } from 'components/ui/Svg'

const AvatarImage = require('assets/AvatarTest.png')

export const ChatHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  return (
    <View style={SS.container}>
      <Pressable style={SS.pointer}>
        <Svg name={'PointerLeft'} />
      </Pressable>
      <View style={SS.name_container}>
        <Image source={AvatarImage} style={SS.avatar}/>
        <Text style={SS.title}>Self-Help Sally</Text>
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 47,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12,
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    paddingLeft: 24,
    paddingBottom: 12
  },
  avatar: {
    width: 36,
    height: 36
  },
  pointer: {
    paddingRight: 30
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingLeft: 7
  },
  name_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
})
