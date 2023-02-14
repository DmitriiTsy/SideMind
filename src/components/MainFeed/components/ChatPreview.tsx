import React, { FC, useMemo } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import RNFastImage from 'react-native-fast-image'

import { observer } from 'mobx-react'

import { AvatarModel } from 'services/FirebaseService/types'
import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { INavigationService, INavigationServiceTid } from 'services'
import { CommonScreenName } from 'constants/screen.types'
import { useTimestamp } from 'utils/timestamp/useTimestamp'
import { Svg } from 'components/ui/Svg'

interface IChatPreview {
  avatar: AvatarModel
  index: number
}

export const ChatPreview: FC<IChatPreview> = observer(({ avatar, index }) => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const isFirst = useMemo(() => index === 0, [index])
  const existMessage = useMemo(
    () => avatar.messages?.displayed?.length > 0,
    [avatar.messages?.displayed?.length]
  )

  const onPress = () => {
    chatVM.setAvatar(avatar)
    navigation.navigate(CommonScreenName.Chat)
  }

  const timestamp = useMemo(
    () => (existMessage ? useTimestamp(avatar.messages.displayed[0].date) : ''),
    [avatar.messages?.displayed, existMessage]
  )

  return (
    <Pressable style={SS.container} onPress={onPress}>
      {!!avatar.uri ? (
        <RNFastImage
          source={{
            uri: avatar.uri
          }}
          style={SS.avatar}
        />
      ) : (
        <Svg name={'AvatarEmpty'} size={52} />
      )}

      <View style={[SS.containerRight, !isFirst && SS.line]}>
        <View style={SS.firstLine}>
          <Text style={SS.botName}>{avatar.name}</Text>
          {existMessage && <Text style={SS.timestamp}>{timestamp}</Text>}
        </View>
        <Text style={SS.botDesc} numberOfLines={2}>
          {(existMessage && avatar.messages.displayed[0].text.trim()) ||
            avatar.tagLine}
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
    paddingLeft: 18
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
