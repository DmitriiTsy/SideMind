import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

import { Bot } from './components/Bot.tsx'
import { ChatHeader } from './components/ChatHeader'

export const SelectBots = () => {
  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <SelectBotsHeader />
      </View>
      <ChatHeader />
      <ScrollView>
        <Bot />
        <Bot />
        <Bot />
        <ChatHeader />
        <Bot />
        <Bot />
        <Bot />
        <Bot />
        <ChatHeader />
        <Bot />
        <Bot />
        <Bot />
        <Bot />
      </ScrollView>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  screenContainer: {
    backgroundColor: '#1C1C1E'
  }
})
