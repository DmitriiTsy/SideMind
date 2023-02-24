import React from 'react'
import {
  ActionSheetIOS,
  Alert,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import {
  ISystemInfoService,
  ISystemInfoServiceTid
} from 'services/SystemInfoService'

export const CreateMindShare = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const systemInfo = useInject<ISystemInfoService>(ISystemInfoServiceTid)

  const deleteMindHandler = () => {
    // AvatarChooseHandler()
  }

  // const shareOptions = {
  //   title: 'Share via',
  //   message: 'some message',
  //   url: `https://sidemind-aa533.web.app/?dID=${systemInfo.deviceId}&bID=${createMindVM.editingAvatar.id}`,
  //   social: RNShare.Social.FACEBOOK
  // }

  const shareHandler = async () => {
    try {
      // RNShare.shareSingle(shareOptions)
      //   .then((res) => {
      //     console.log(res)
      //   })
      //   .catch((err) => {
      //     err && console.log(err)
      //   })

      const avatar = createMindVM.editingAvatar
      const result = await Share.share({
        url: `https://sidemind.app/?dID=${systemInfo.deviceId}&bID=${avatar.id}`
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType)
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(result)
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  const AvatarChooseHandler = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          t.get('are you sure'),
          t.get('yes delete mind'),
          // t.get('generate avatar'),
          t.get('cancel')
        ],
        disabledButtonIndices: [0],
        cancelButtonIndex: 2,
        tintColor: '#EB5545',
        cancelButtonTintColor: '#549EF7',
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          createMindVM.deleteMind()
        }
        if (buttonIndex === 1) {
          createMindVM.deleteMind()
        }
      }
    )
  }

  return (
    <View style={SS.container}>
      <Pressable style={SS.wrapperShare} onPress={shareHandler}>
        <View>
          <Text style={SS.ShareText}>{t.get('share mind')}</Text>
        </View>
      </Pressable>
      <Pressable style={SS.wrapperDelete} onPress={deleteMindHandler}>
        <View>
          <Text style={SS.DeleteText}>{t.get('delete mind')}</Text>
        </View>
      </Pressable>
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 80,
    borderRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: 12,
    backgroundColor: '#303030',
    marginBottom: 21,
    marginHorizontal: 18
  },
  wrapperShare: {
    borderBottomColor: '#444444',
    borderBottomWidth: 0.5,
    width: '100%',
    paddingBottom: 12,
    paddingHorizontal: 18
  },
  wrapperDelete: {
    paddingHorizontal: 18,
    paddingTop: 12,
    width: '100%',
    height: '100%'
  },
  ShareText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#549EF7',
    lineHeight: 16
  },
  DeleteText: {
    fontWeight: '500',
    fontSize: 16,
    color: '#EB5545',
    lineHeight: 16
  }
})
