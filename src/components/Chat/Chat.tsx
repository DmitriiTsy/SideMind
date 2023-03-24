import React, { useMemo, useCallback, useState } from 'react'
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity
} from 'react-native'

import { observer } from 'mobx-react'

import RNFastImage from 'react-native-fast-image'

import { useFocusEffect } from '@react-navigation/native'

import { ScreenContainer } from 'components/ScreenContainer'
import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import {
  ILocalizationService,
  ILocalizationServiceTid,
  INavigationService,
  INavigationServiceTid
} from 'services'
import { Resetting } from 'components/Chat/components/Resetting'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { EBottomPanelContent } from 'components/BottomPanel/types'

import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { useSharedAvatar } from 'components/Chat/utils/useSharedAvatar'

import { SVG_MAP } from 'components/ui/Svg/constants'

import {
  ITinyUrlService,
  ITinyUrlServiceTId
} from 'services/TinyUrlService/TinyUrlService'

import { shareHandler } from 'utils/helpers/shareHandler'

import { ChatInput, List } from './components'

interface IShareOption {
  icon: keyof typeof SVG_MAP
  text: string
  onPress: () => void
}

export const Chat = observer(() => {
  const [modalVisible, setModalVisible] = useState(false)

  const chatVM = useInject<IChatVM>(IChatVMTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const tinyUrlService = useInject<ITinyUrlService>(ITinyUrlServiceTId)

  useSharedAvatar()

  useFocusEffect(
    useCallback(() => {
      if (chatVM.avatar?.deleted) {
        Alert.alert(t.get('no longer available'), undefined, undefined, {
          userInterfaceStyle: 'dark'
        })
      }
    }, [chatVM.avatar?.deleted, t])
  )

  const goBack = () => {
    navigation.popToTop()
  }

  const resetAvailable = useMemo(
    () => chatVM.messages.length > 1,
    [chatVM.messages.length]
  )
  const reset = () => {
    chatVM.changeResetState(true)
  }

  const editMindHandler = useCallback(() => {
    createMindVM.init(chatVM.avatar)
    bottomPanelVM.openPanel(EBottomPanelContent.CreateMind)
  }, [bottomPanelVM, chatVM.avatar, createMindVM])

  const shareOptions: IShareOption[] = [
    {
      icon: 'ShareMind',
      text: 'Share Mind',
      onPress: () => {
        setModalVisible(false)
        setTimeout(() => {
          shareHandler('mind', tinyUrlService, chatVM.avatar)
        }, 100)
      }
    },
    {
      icon: 'ShareConversation',
      text: 'Share Conversation',
      onPress: () => {
        setModalVisible(false)
        setTimeout(() => {
          shareHandler('conv', tinyUrlService)
        }, 100)
      }
    },
    {
      icon: 'ShareApp',
      text: 'Share App',
      onPress: () => {
        setModalVisible(false)
        setTimeout(() => {
          shareHandler('app', tinyUrlService)
        }, 100)
      }
    }
  ]

  const header = () => (
    <View style={SS.container}>
      <View style={SS.leftSide}>
        <Pressable style={SS.containerGoBack} onPress={goBack}>
          <Svg name={'PointerLeft'} />
        </Pressable>
        <Pressable onPress={editMindHandler} style={SS.containerAvatarText}>
          {chatVM.avatar?.uri ? (
            <RNFastImage
              source={{
                uri: chatVM.avatar.uri
              }}
              style={SS.avatar}
            />
          ) : (
            <Svg name={'AvatarEmpty'} size={36} style={{ marginRight: 7 }} />
          )}
          <Text style={SS.title}>{chatVM.avatar?.name}</Text>
        </Pressable>
      </View>

      <Pressable
        style={SS.resetContainer}
        disabled={!resetAvailable}
        onPress={reset}
      >
        <Svg name={'Reset'} color={!resetAvailable && '#666666'} />
      </Pressable>

      <Pressable
        style={SS.shareContainer}
        onPress={() => setModalVisible(true)}
      >
        <Svg name={'Share'} />
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
      <Modal transparent visible={modalVisible}>
        <View style={{ position: 'relative' }}>
          <Pressable
            style={SS.pressModal}
            onPress={() => {
              setModalVisible(false)
            }}
          />
          <View style={SS.viewModal}>
            {shareOptions.map((item, index) => (
              <TouchableOpacity
                onPress={item.onPress}
                key={index}
                style={[
                  SS.shareOption,
                  {
                    borderBottomWidth:
                      index !== shareOptions.length - 1 ? 0.5 : 0
                  }
                ]}
              >
                <Text
                  style={{
                    color: '#FFFFFF',
                    fontSize: 15,
                    lineHeight: 21,
                    letterSpacing: 0.5
                  }}
                >
                  {item.text}
                </Text>
                <View style={{ marginRight: 34 }}>
                  <Svg name={item.icon} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      <List />
      <Resetting />
      <ChatInput />
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  screenContainer: {
    backgroundColor: '#000000',
    justifyContent: 'space-between'
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
    lineHeight: 20,
    letterSpacing: -0.3,
    color: '#FFFFFF'
  },
  containerAvatarText: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    width: 200
  },
  containerGoBack: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 32
  },
  resetContainer: {
    height: 36,
    width: 36,
    alignItems: 'center',
    justifyContent: 'center'
  },
  shareContainer: {
    marginRight: 6,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pressModal: {
    flex: 1,
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  viewModal: {
    backgroundColor: '#2C2C2D',
    borderRadius: 12,
    marginTop: 100,
    width: 226,
    position: 'absolute',
    right: 0
  },
  shareOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 226,
    marginLeft: 18,
    paddingVertical: 11,
    borderBottomColor: '#444444'
  }
})
