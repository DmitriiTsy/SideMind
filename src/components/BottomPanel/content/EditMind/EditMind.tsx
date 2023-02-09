import { observer } from 'mobx-react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'
import { IChatVM, IChatVMTid } from 'components/Chat/Chat.vm'
import {
  CreateMindHeader,
  CreateMindInputs,
  CreateMindPickImage
} from 'components/BottomPanel/content/CreateMind/components'

export const EditMind = observer(() => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)
  createMindVM.edit = true
  const chatVM = useInject<IChatVM>(IChatVMTid)

  return (
    <View style={[SS.container]}>
      <CreateMindHeader />
      <CreateMindPickImage />
      <CreateMindInputs
        name={chatVM.avatar.name}
        tagline={chatVM.avatar.tagLine}
        bio={chatVM.avatar.bio}
      />
      {createMindVM.pending && (
        <View style={SS.loading}>
          <ActivityIndicator size="large" color="#D3D3D3" />
        </View>
      )}
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    flex: 1
  },
  loading: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)'
  }
})
