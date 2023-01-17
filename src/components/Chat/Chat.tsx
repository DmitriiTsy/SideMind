import React from 'react'
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

  const goBack = () => {
    navigation.goBack()
  }

  const header = () => (
    <View style={SS.container}>
      <Pressable style={SS.containerGoback} onPress={goBack}>
      <Svg name={'PointerLeft'} style={SS.goBackSource} />
      </Pressable>
        <Image source={{ uri: chatVM.avatar.imagePath }} style={SS.avatar} />
      <Text style={SS.title}>{chatVM.avatar.name}</Text>
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
  container: {
    flexDirection: 'row',
    height: 47,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
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
  },
  containerGoback: {
    height: 47,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  goBackSource: {
    marginRight: 30
  }
})
