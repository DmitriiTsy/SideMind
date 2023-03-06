import React, { useMemo } from 'react'
import { Alert, Pressable, Share, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { nop } from 'utils/nop'

export const CreateMindShare = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  const shareHandler = async () => {
    try {
      const avatar = createMindVM.editingAvatar
      const result = await Share.share({
        url: `https://sidemind.app/?bID=${avatar.id}&name=${avatar.name}&image=${avatar.uri}`
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(result.activityType)
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
        console.log(result)
      }
    } catch (error: any) {
      Alert.alert(error.message)
    }
  }

  const deleteAvatar = () => {
    Alert.alert(
      t.get('delete mind'),
      t.get('are you sure'),
      [
        {
          text: t.get('yes delete mind'),
          onPress: () => createMindVM.deleteMind(),
          style: 'destructive'
        },
        {
          text: t.get('cancel'),
          onPress: nop,
          style: 'cancel'
        }
      ],
      { userInterfaceStyle: 'dark' }
    )
  }

  const disableDelete = useMemo(
    () => !createMindVM.editingAvatar || !!createMindVM.ownerError,
    [createMindVM.editingAvatar, createMindVM.ownerError]
  )

  return (
    <View style={SS.container}>
      <Pressable style={SS.wrapperShare} onPress={shareHandler}>
        <Text style={SS.ShareText}>{t.get('share mind')}</Text>
      </Pressable>

      <Pressable
        style={SS.wrapperDelete}
        disabled={disableDelete}
        onPress={deleteAvatar}
      >
        <Text style={SS.DeleteText}>{t.get('delete mind')}</Text>
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
