import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

import { ChatHeader } from './components/ChatHeader'

import { BOTS_MAP } from './constants'

import { Bot } from './components/Bot'

const ImprovementImages = [
  [
    require('assets/small/Roxy.png'),
    require('assets/small/Jamie.png'),
    require('assets/small/Sally.png')
  ],
  [
    require('assets/small/Elaine.png'),
    require('assets/small/Claudia.png'),
    require('assets/small/Emily.png'),
    require('assets/small/Isla.png')
  ],
  [
    require('assets/small/Charlie.png'),
    require('assets/small/Chrissy.png'),
    require('assets/small/Alex.png')
  ],
  [
    require('assets/small/Sawyer.png'),
    require('assets/small/Lee.png'),
    require('assets/small/Larry.png'),
    require('assets/small/Tinder.png')
  ],
  [
    require('assets/small/Henry.png'),
    require('assets/small/Nelly.png'),
    require('assets/small/Greg.png'),
    require('assets/small/BadComedian.png'),
    require('assets/small/Nancy.png'),
    require('assets/small/Bob.png')
  ]
]

export const SelectBots = () => {
  const BotsSectionsHandler = (params: any) => {
    switch (params) {
      case 'Self-Improvement':
        return BOTS_MAP[1].map((element, index) => (
          <Bot
            key={index}
            botId={index * Math.random()}
            props={element}
            source={ImprovementImages[0][index]}
          />
        ))
        break
      case 'Productivity':
        return BOTS_MAP[2].map((element, index) => (
          <Bot
            key={index}
            props={element}
            source={ImprovementImages[1][index]}
          />
        ))
        break
      case 'Hobbies':
        return BOTS_MAP[3].map((element, index) => (
          <Bot
            key={index}
            props={element}
            source={ImprovementImages[2][index]}
          />
        ))
        break
      case 'Relationships':
        return BOTS_MAP[4].map((element, index) => (
          <Bot
            key={index}
            props={element}
            source={ImprovementImages[3][index]}
          />
        ))
        break
      case 'Entertainment':
        return BOTS_MAP[5].map((element, index) => (
          <Bot
            key={index}
            props={element}
            source={ImprovementImages[4][index]}
          />
        ))
        break
      default:
        return BOTS_MAP[5].map((element, index) => (
          <Bot
            key={index}
            props={element}
            source={ImprovementImages[5][index]}
          />
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
      <ScrollView style={SS.container_scroll}>
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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  screenContainer: {
    backgroundColor: 'black',
    height: 52
  },
  container_scroll: {
    marginTop: 52
  }
})

// "header_self_improvement": "Self-Improvement",
// "header_productivity": "Productivity",
// "header_hobbies": "Hobbies",
// "header_relationships": "Relationships",
// "header_entertainment": "Entertainment"