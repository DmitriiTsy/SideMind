import React, { useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { Svg } from 'components/ui/Svg'

import { ChatInput, List } from './components'

export const Chat = () => {
  const header = useMemo(
    () => (
      <View style={SS.container}>
        <Svg name={'PointerLeft'} style={{ marginRight: 30 }} />
        <Image source={require('assets/AvatarTest2.png')} style={SS.avatar} />
        <Text style={SS.title}>Self-Help Sally</Text>
      </View>
    ),
    []
  )

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header}
      <List />
      <ChatInput />
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000',
    justifyContent: 'space-between'
  },
  container: {
    flexDirection: 'row',
    height: 47,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    paddingLeft: 24
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 7
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: '#FFFFFF'
  }
})
