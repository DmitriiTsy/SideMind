import React, { FC } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Bot } from 'components/SelectBots/components/Bot'
import { BotModel } from 'services/FirebaseService/types'

interface IGroupedBotsProps {
  bots: BotModel[]
}

export const GroupedBots: FC<IGroupedBotsProps> = ({ bots }) => {
  return (
    <View style={SS.container}>
      <Text style={SS.title}>{bots[0].category}</Text>
      <View style={SS.separator} />
      {bots.map((el, index) => (
        <Bot key={index} bot={el} />
      ))}
    </View>
  )
}

const SS = StyleSheet.create({
  container: { marginLeft: 18, marginTop: 21 },
  separator: {
    marginTop: 8,
    marginBottom: 4.5,
    height: 0.5,
    width: '100%',
    backgroundColor: '#333333'
  },
  title: {
    color: '#99989E',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16
  }
})
