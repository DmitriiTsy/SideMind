import React, { useMemo } from 'react'
import { Alert, Pressable, Share, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { nop } from 'utils/nop'
import {
  ITinyUrlService,
  ITinyUrlServiceTId
} from 'services/TinyUrlService/TinyUrlService'
import { EAvatarsCategory } from 'services/FirebaseService/types'

export const CreateMindShare = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  const tinyUrlService = useInject<ITinyUrlService>(ITinyUrlServiceTId)

  const shareHandler = async () => {
    try {
      createMindVM.pending = true
      const avatar = createMindVM.editingAvatar

      const tinyUrl = await tinyUrlService.getTinyUrl(
        avatar.id,
        avatar.name,
        avatar.uri,
        avatar.category !== EAvatarsCategory.Custom,
        avatar.category === EAvatarsCategory.Starting
      )
      createMindVM.pending = false

      const result = await Share.share({
        url: tinyUrl
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
      <Pressable
        style={[
          SS.wrapper,
          SS.share,
          !!createMindVM.ownerError && SS.bottomRadius
        ]}
        onPress={shareHandler}
      >
        <Text style={SS.ShareText}>{t.get('share mind')}</Text>
      </Pressable>

      {!!!createMindVM.ownerError && (
        <Pressable
          style={[SS.wrapper, SS.delete]}
          disabled={disableDelete}
          onPress={deleteAvatar}
        >
          <Text style={SS.DeleteText}>{t.get('delete mind')}</Text>
        </Pressable>
      )}
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    marginTop: 18,
    marginBottom: 21
  },
  wrapper: {
    height: 35,
    borderBottomColor: '#444444',
    paddingHorizontal: 18,
    backgroundColor: '#303030',
    marginHorizontal: 18,
    justifyContent: 'center'
  },
  share: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomWidth: 0.5
  },
  delete: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12
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
  },
  bottomRadius: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderBottomWidth: 0
  }
})
