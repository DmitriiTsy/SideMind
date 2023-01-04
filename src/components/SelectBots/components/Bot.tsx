import React, { useState, useMemo } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import { useInject } from 'IoC'

import { Svg } from 'components/ui/Svg'

import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const Bot = ({ props, source }) => {
  const name = props.name
  const tagline = props.tagLine
  const [ChoosenChat, setChoosenChat] = useState(false)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)

  const ChoosenChatHandler = () =>
    ChoosenChat ? setChoosenChat(false) : setChoosenChat(true)

  const ChoosenChatStylesHandler = useMemo(
    () => <View style={SS.empty}>{ChoosenChat && <Svg name={'Check'} />}</View>,
    [ChoosenChat]
  )

  return (
    <Pressable onPress={ChoosenChatHandler} style={SS.container}>
      <Image source={source} />

      <View style={SS.containerRight}>
        <View>
          <Text style={SS.botName}>{name}</Text>
          <Text style={SS.botDesc}>{tagline}</Text>
        </View>
        {ChoosenChatStylesHandler}
      </View>
    </Pressable>
  )
}

const SS = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 18,
    backgroundColor: '#1C1C1E'
  },
  containerRight: {
    alignItems: 'center',
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    height: '100%'
  },
  botName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.2
  },
  botDesc: {
    color: '#98989E',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.2,
    maxWidth: 250
  },
  empty: {
    width: 20,
    height: 20,
    borderRadius: 250,
    borderWidth: 1,
    borderColor: '#484849',
    marginRight: 18,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
