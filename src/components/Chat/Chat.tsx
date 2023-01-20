import React, { useCallback, useMemo } from 'react'
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
import { ILocalizationService, ILocalizationServiceTid } from 'services'

import { ChatInput, List } from './components'

export const Chat = observer(() => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const goBack = () => {
    navigation.goBack()
  }

  const resetAvailable = useMemo(
    () => chatVM.messages.length > 1,
    [chatVM.messages.length]
  )
  const clearFromClipboard = useCallback(() => {
    chatVM.blur = false
  }, [chatVM])

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
    <Pressable onPress={clearFromClipboard} style={SS.absolute}>
      <View style={SS.absolute}>
        <BlurView
          style={SS.absolute}
          blurType="dark"
          blurAmount={6}
          reducedTransparencyFallbackColor="white"
          blurRadius={25}
        >
          <View style={SS.blurWrapper}>
            <View
              style={[
                chatVM.isBot ? SS.blurContainerText : SS.blurContainerHuman
              ]}
            >
              <Text style={SS.blurText}>{chatVM.blurmessage}</Text>
            </View>
            <View style={SS.containerCopy}>
              <Text style={SS.copyText}>{t.get('copy')}</Text>
              <Svg name={'Copy'} />
            </View>
          </View>
        </BlurView>
      </View>
    </Pressable>
  )
  // style={[
  //   SS.container,
  //   isBot ? SS.fromBot : SS.fromHuman,
  //   isLast && SS.last
  // ]}
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
  containerCopy: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 83,
    height: 38,
    borderRadius: 25,
    padding: 9,
    backgroundColor: '#363637',
    marginTop: 6,
    fontSize: 16
  },
  copyText: {
    marginRight: 12,
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
  },
  blurWrapper: {
    position: 'absolute',
    top: '50%',
    flexDirection: 'column',
    marginLeft: 12
  },
  blurContainerText: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#363637',
    borderBottomLeftRadius: 2,
    maxWidth: deviceWidth * 0.85
  },
  blurContainerHuman: {
    padding: 9,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: '#549EF7',
    borderBottomRightRadius: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    maxWidth: deviceWidth * 0.65,
    marginRight: 12
  },
  blurText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#FFF'
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
