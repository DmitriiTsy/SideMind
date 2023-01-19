import React, { useMemo } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'

import { BlurView } from '@react-native-community/blur'

import { deviceWidth } from 'utils/dimentions'
import { ScreenContainer } from 'components/ScreenContainer'
import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { INavigationService, INavigationServiceTid } from 'services'
import { Resetting } from 'components/Chat/components/Resetting'

import { ChatInput, List } from './components'

export const Chat = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  const goBack = () => {
    navigation.goBack()
  }

  const resetAvailable = useMemo(
    () => chatVM.messages.length > 1,
    [chatVM.messages.length]
  )

  const reset = () => {
    chatVM.changeResetState(true)
  }

  const header = () => (
    <View style={SS.container}>
      <View style={SS.leftSide}>
        <Pressable style={SS.containerGoBack} onPress={goBack}>
          <Svg name={'PointerLeft'} />
        </Pressable>
        <Image source={{ uri: chatVM.avatar.imagePath }} style={SS.avatar} />
        <Text style={SS.title}>{chatVM.avatar.name}</Text>
      </View>
      <Pressable
        style={SS.resetContainer}
        disabled={!resetAvailable}
        onPress={reset}
      >
        <Svg name={'Reset'} color={!resetAvailable && '#666666'} />
      </Pressable>
    </View>
  )

  const BlurToggle = () => (
    <BlurView
      style={SS.absolute}
      blurType="dark"
      blurAmount={6}
      reducedTransparencyFallbackColor="white"
    >
      <View style={SS.blurContainer}>
        <Text style={SS.blurText}>{chatVM.blurmessage}</Text>
      </View>
    </BlurView>
  )

  return (
    <ScreenContainer
      topInsetColor={'#000000'}
      bottomInsetColor={'#000000'}
      style={SS.screenContainer}
    >
      {header()}
      <List />
      <Resetting />
      <ChatInput />
      {chatVM.blur && <BlurToggle />}
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000',
    justifyContent: 'space-between'
  },
  blurContainer: {
    position: 'absolute',
    top: '50%',
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#363637',
    borderBottomLeftRadius: 2,
    alignItems: 'flex-start',
    marginLeft: 12,
    maxWidth: deviceWidth * 0.85
  },
  blurText: {
    color: 'white'
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    height: 47,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#333333',
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
  containerGoBack: {
    height: 47,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 30
  },
  resetContainer: { marginRight: 19 }
})
