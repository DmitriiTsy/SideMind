import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

import { ChatHeader } from './components/ChatHeader'

import { BOTS_MAP } from './constants'

import { Bot } from './components/Bot'

const ImprovementImages = [
  require('assets/small/Alex.png'),
  require('assets/small/Bob.png'),
  require('assets/small/BadComedian.png')
]

export const SelectBots = () => {
  const BotsSectionsHandler = (params: any) => {
    switch (params) {
      case 'Self-Improvement':
        return BOTS_MAP[0].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[0]} />
        ))
        break
      case 'Productivity':
        return BOTS_MAP[1].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[1]} />
        ))
        break
      case 'Hobbies':
        return BOTS_MAP[2].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[2]} />
        ))
        break
      case 'Relationships':
        return BOTS_MAP[3].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[2]} />
        ))
        break
      case 'Entertainment':
        return BOTS_MAP[4].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[2]} />
        ))
        break
      default:
        return BOTS_MAP[0].map((element, index) => (
          <Bot key={index} props={element} source={ImprovementImages[0]} />
        ))
    }
  }

  return (
    <ScreenContainer
      topInsetColor={'black'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <View style={SS.container}>
        <SelectBotsHeader />
      </View>
      <ScrollView>
        <ChatHeader props="Self-Improvement" />
        {BotsSectionsHandler('Self-Improvement')}
        <ChatHeader props="Productivity" />
        {BotsSectionsHandler('Productivity')}
        <ChatHeader props="Hobbies" />
        {BotsSectionsHandler('Hobbies')}
        <ChatHeader props="Relationships" />
        {BotsSectionsHandler('Relationships')}
        <ChatHeader props="Entertainment" />
        {BotsSectionsHandler('Entertainment')}
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

// "header_self_improvement": "Self-Improvement",
// "header_productivity": "Productivity",
// "header_hobbies": "Hobbies",
// "header_relationships": "Relationships",
// "header_entertainment": "Entertainment"