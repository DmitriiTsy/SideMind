import React, { FC, useCallback } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

import { observer } from 'mobx-react'

import RNFastImage from 'react-native-fast-image'

import { AvatarModel } from 'services/FirebaseService/types'
import { useInject } from 'IoC'
import { deviceWidth } from 'utils/dimentions'
import { ISelectAvatarsVM, ISelectAvatarsVMTid } from 'components/SelectAvatars'
import { IAppStore, IAppStoreTid } from 'store/AppStore'
import { IBottomPanelVM, IBottomPanelVMTid } from 'components/BottomPanel'
import { INavigationService, INavigationServiceTid } from 'services'
import { CommonScreenName } from 'constants/screen.types'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'

interface IBotProps {
  avatar: AvatarModel
  single?: boolean
}

export const Avatar: FC<IBotProps> = observer(({ avatar, single }) => {
  const vm = useInject<ISelectAvatarsVM>(ISelectAvatarsVMTid)
  const appStore = useInject<IAppStore>(IAppStoreTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)
  const chatVM = useInject<IChatVM>(IChatVMTid)
  const bottomPanelVM = useInject<IBottomPanelVM>(IBottomPanelVMTid)

  const set = useCallback(() => {
    vm.setAvatars(avatar)
    navigation.navigate(CommonScreenName.MainFeed)
  }, [vm, avatar, navigation])

  const update = useCallback(async () => {
    const _avatar = await appStore.updateUsersAvatars(avatar)
    chatVM.setAvatar(_avatar || avatar)
    bottomPanelVM.closePanel()
    navigation.navigate(CommonScreenName.Chat)
  }, [appStore, avatar, bottomPanelVM, chatVM, navigation])

  return (
    <Pressable onPress={single ? update : set} style={SS.container}>
      <RNFastImage
        source={{
          uri: avatar.imagePath
        }}
        style={SS.image}
      />

      <View style={SS.containerRight}>
        <View>
          <Text style={SS.botName}>{avatar.name}</Text>
          <Text
            style={[
              SS.botDesc,
              !single && {
                maxWidth: deviceWidth * 0.7
              }
            ]}
          >
            {avatar.tagLine}
          </Text>
        </View>
      </View>
    </Pressable>
  )
})

const SS = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row'
  },
  containerRight: {
    alignItems: 'center',
    marginLeft: 12,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#333333'
  },
  botName: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: -0.2,
    marginTop: 3.5
  },
  botDesc: {
    color: '#98989E',
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 12,
    letterSpacing: 0.2,
    marginTop: 2,
    marginBottom: 7.5
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
  },
  image: { width: 36, height: 36, borderRadius: 250 }
})
