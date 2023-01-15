import React, { FC, useMemo } from 'react'
import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

import { BotModel } from 'services/FirebaseService/types'
import { useInject } from 'IoC'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import { INavigationService, INavigationServiceTid } from 'services'
import { CommonScreenName } from 'constants/screen.types'

interface IChatPreview {
  bot: BotModel
  index: number
}

export const ChatPreview: FC<IChatPreview> = ({ bot, index }) => {
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const isFirst = useMemo(() => index === 0, [index])
  const onPress = () => {
    chatVM.setBot(bot)
    navigation.navigate(CommonScreenName.Chat)
  }

  return (
    <Pressable style={SS.container} onPress={onPress}>
      <Image source={{ uri: bot.imagePath }} style={SS.avatar} />
      <View style={[SS.containerRight, !isFirst && SS.line]}>
        <Text style={SS.botName}>{bot.name}</Text>
        <Text style={SS.botDesc} numberOfLines={2}>
          {(bot.messages?.displayed?.length !== 0 &&
            bot.messages?.displayed[0]?.text?.trim()) ||
            bot.tagLine}
        </Text>
      </View>
    </Pressable>
  )
}

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
  }
})
