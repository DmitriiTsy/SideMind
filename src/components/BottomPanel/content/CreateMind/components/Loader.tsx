import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

import { observer } from 'mobx-react'

import RNFastImage from 'react-native-fast-image'

import { Svg } from 'components/ui/Svg'
import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const Loader = observer(() => {
  const { previewAvatar, editableAvatar } =
    useInject<ICreateMindVM>(ICreateMindVMTid)
  return (
    <View style={SS.container}>
      <Text style={SS.title}>Creating your mind...</Text>

      {previewAvatar?.uri || editableAvatar?.uri ? (
        <RNFastImage
          style={[SS.image, SS.img]}
          source={{
            uri: previewAvatar?.uri || editableAvatar?.uri
          }}
        />
      ) : (
        <Svg name={'AvatarEmpty'} style={SS.img} />
      )}

      <Text style={SS.name}>{previewAvatar?.name || ''}</Text>

      <Text style={SS.tagLine}>{previewAvatar?.tagLine || ''}</Text>

      <ActivityIndicator
        size="large"
        color="#D3D3D3"
        style={{ marginTop: 100 }}
      />
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginVertical: 20
  },
  img: {
    marginTop: 12,
    marginBottom: 16
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: 'white'
  },
  tagLine: {
    fontSize: 16,
    fontWeight: '400',
    color: '#707070',
    marginHorizontal: 36,
    textAlign: 'center',
    marginTop: 8
  },
  image: { width: 108, height: 108, borderRadius: 100 }
})
