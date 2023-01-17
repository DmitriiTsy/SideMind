import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { ScreenContainer } from 'components/ScreenContainer'

import { Svg } from 'components/ui/Svg'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

import { INavigationService, INavigationServiceTid } from 'services'

import { ChatInput, List } from './components'

export const Chat = () => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const [messagesArray, setMessagesArray] = useState(chatVM.messages)
  const goBack = () => {
    navigation.goBack()
  }

  const reset = () => {
    chatVM.resetMessages()
  }

  console.log(chatVM.bot.messages.displayed.length)
  console.log(messagesArray.length)

  const header = () => (
    <View style={SS.wrapper}>
      <View style={SS.container}>
        <Svg
          name={'PointerLeft'}
          style={{ marginRight: 30 }}
          onPress={goBack}
        />
        <Image source={{ uri: chatVM.bot.imagePath }} style={SS.avatar} />
        <Text style={SS.title}>{chatVM.bot.name}</Text>
      </View>
      <Pressable
        style={SS.containerReset}
        onPress={reset}
        disabled={messagesArray.length <= 1 ? true : false}
      >
        <Svg
          name={'Reset'}
          color={
            messagesArray.length === 0 || messagesArray.length <= 1
              ? 'grey'
              : 'white'
          }
        />
      </Pressable>
    </View>
  )

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header()}
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
  containerReset: {
    height: 47,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerResetNoActive: {
    height: 47,
    width: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
    paddingRight: 24
  },
  container: {
    flexDirection: 'row',
    height: 47,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 24,
    paddingBottom: 10
  },
  avatar: {
    width: 36,
    height: 36,
    marginRight: 7,
    borderRadius: 250
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.3,
    color: '#FFFFFF'
  }
})
