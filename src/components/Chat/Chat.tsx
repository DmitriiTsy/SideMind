import React, { useMemo } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { Svg } from 'components/ui/Svg'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

import { INavigationService, INavigationServiceTid } from 'services'

import { ChatInput, List } from './components'

export const Chat = () => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const header = useMemo(
    () => (
      <View style={SS.container}>
        <Svg
          name={'PointerLeft'}
          style={{ marginRight: 30 }}
          onPress={navigation.goBack}
        />
        <Image source={{ uri: chatVM.bot.imagePath }} style={SS.avatar} />
        <Text style={SS.title}>{chatVM.bot.name}</Text>
      </View>
    ),
    [chatVM.bot.imagePath, chatVM.bot.name, navigation.goBack]
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
