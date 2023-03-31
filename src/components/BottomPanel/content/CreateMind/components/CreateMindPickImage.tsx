import React, { useCallback, useMemo } from 'react'
import { ActionSheetIOS, Pressable, StyleSheet, Text, View } from 'react-native'
import { observer } from 'mobx-react'

import RNFastImage from 'react-native-fast-image'

import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker'

import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { EAvatarsCategory } from 'services/FirebaseService/types'

export const CreateMindPickImage = observer(() => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  const isCustomAvatar = useMemo(() => {
    return (
      !createMindVM.editableAvatar ||
      createMindVM.editableAvatar?.category === EAvatarsCategory.Custom
    )
  }, [createMindVM.editableAvatar])

  const _setAvatar = useCallback(
    (res: ImagePickerResponse) => {
      if (!res.didCancel && !res.errorCode && res.assets.length) {
        const asset = res.assets[0]
        if (asset.uri && asset.fileName) {
          createMindVM.image = {
            localePath: asset.uri,
            fileName: asset.fileName
          }
        }
      }
    },
    [createMindVM]
  )

  const AvatarChooseHandler = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: [
          t.get('take photo'),
          t.get('upload photo'),
          // t.get('generate avatar'),
          t.get('cancel')
        ],
        cancelButtonIndex: 2,
        userInterfaceStyle: 'dark'
      },
      async (buttonIndex) => {
        if (buttonIndex === 0) {
          const res = await launchCamera({ mediaType: 'photo' })
          _setAvatar(res)
        }
        if (buttonIndex === 1) {
          const res = await launchImageLibrary({ mediaType: 'photo' })
          _setAvatar(res)
        }
        // if (buttonIndex === 2) {
        //   console.log('ai generated avatar')
        // }
      }
    )
  }

  return (
    <View style={SS.container}>
      <Pressable
        onPress={AvatarChooseHandler}
        disabled={!isCustomAvatar || !!createMindVM.ownerError}
      >
        {createMindVM.image || createMindVM.editableAvatar?.uri ? (
          <RNFastImage
            style={SS.image}
            source={{
              uri:
                createMindVM.image?.localePath ||
                createMindVM.editableAvatar?.uri,
              cache: createMindVM.image
                ? RNFastImage.cacheControl.immutable
                : RNFastImage.cacheControl.cacheOnly
            }}
          />
        ) : (
          <Svg name={'AvatarEmpty'} />
        )}
      </Pressable>
      {!createMindVM.ownerError && (
        <Pressable
          style={SS.textsWrapper}
          onPress={AvatarChooseHandler}
          disabled={!isCustomAvatar || !!createMindVM.ownerError}
        >
          <Text style={SS.texts}>{t.get('edit avatar')}</Text>
        </Pressable>
      )}
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 14
  },
  textsWrapper: {
    paddingTop: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  texts: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    lineHeight: 16,
    letterSpacing: -0.3
  },
  image: { width: 108, height: 108, borderRadius: 100 }
})
