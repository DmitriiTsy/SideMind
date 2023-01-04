import React from 'react'
import { ScrollView, StyleSheet, View, FlatList, Text, ListRenderItem, ListRenderItemInfo } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'
import { SelectBotsHeader } from 'components/SelectBots/components'

import { ChatHeader } from './components/ChatHeader'

import { BOTS_MAP } from './constants'

import { Bot } from './components/Bot'
import { IBot } from './types'

const ImprovementImages = [
  [require('assets/small/Sam.png'), require('assets/small/Fiona.png')],
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
  const keyExtractorHandler = (item) => {
    return item.name
  }

  const renderItem = ({ item, index }: ListRenderItemInfo<IBot[]>) => (
    <View>
      <ChatHeader props={item[0].category} />
      {item.map((element, keys) => (
        <Bot
          key={keys}
          props={element}
          botId={undefined}
          source={ImprovementImages[index][keys]}
        />
      ))}
    </View>
  )
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
        <FlatList
          data={BOTS_MAP}
          renderItem={renderItem}
          keyExtractor={keyExtractorHandler} //
        />
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
    marginTop: 52,
    backgroundColor: '#1C1C1E'
  },
  title: {
    color: 'white'
  },
  item: {
    color: 'white'
  }
})

// "header_self_improvement": "Self-Improvement",
// "header_productivity": "Productivity",
// "header_hobbies": "Hobbies",
// "header_relationships": "Relationships",
// "header_entertainment": "Entertainment"