import React, { FC, useCallback, useMemo } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import RNFastImage from 'react-native-fast-image'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { INavigationService, INavigationServiceTid } from 'services'
import { CommonScreenName } from 'constants/screen.types'
import { useTimestamp } from 'utils/timestamp/useTimestamp'
import { Svg } from 'components/ui/Svg'

import { IAvatar } from '../../../classes/Avatar'

interface IChatPreview {
  avatar: IAvatar
  index: number
}

export const ChatPreview: FC<IChatPreview> = observer(({ avatar, index }) => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const isFirst = useMemo(() => index === 0, [index])
  const message = useMemo(() => {
    if (avatar.data.messages?.displayed?.length > 0) {
      const messages = avatar.data.messages.displayed
      return messages[messages.length - 1]
    }
    return undefined
  }, [avatar.data.messages.displayed])

  const onPress = useCallback(() => {
    chatVM.setAvatar(avatar)
    navigation.navigate(CommonScreenName.Chat)
  }, [avatar, chatVM, navigation])

  const timestamp = useMemo(
    () => (message ? useTimestamp(message.date) : ''),
    [message]
  )

  return (
    <Pressable style={SS.container} onPress={onPress}>
      {!!avatar.data.uri ? (
        <RNFastImage
          source={{
            uri: avatar.data.uri
          }}
          style={SS.avatar}
        />
      ) : (
        <Svg name={'AvatarEmpty'} size={52} />
      )}

      <View style={[SS.containerRight, !isFirst && SS.line]}>
        <View style={SS.firstLine}>
          <Text style={SS.botName}>{avatar.data.name}</Text>
          {message && <Text style={SS.timestamp}>{timestamp}</Text>}
        </View>
        <Text style={SS.botDesc} numberOfLines={2}>
          {(message && message.text.trim()) || avatar.data.tagLine}
        </Text>
      </View>
    </Pressable>
  )
})

const SS = StyleSheet.create({
  container: {
    width: '100%',
    height: 77,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 18,
    backgroundColor: 'black'
  },
  containerRight: {
    alignItems: 'flex-start',
    paddingTop: 12,
    flex: 1,
    height: '100%',
    marginLeft: 14
  },
  line: {
    borderTopWidth: 0.5,
    borderColor: '#333333'
  },
  avatarContainer: {
    height: '100%',
    marginRight: 14,
    paddingTop: 12
  },
  botName: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: 0.4,
    marginBottom: 2
  },
  botDesc: {
    color: '#7D7D82',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 19,
    letterSpacing: 0.4
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 250
  },
  firstLine: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  timestamp: {
    color: '#7D7D82',
    marginRight: 18,
    fontSize: 15,
    fontWeight: '400'
  }
})
