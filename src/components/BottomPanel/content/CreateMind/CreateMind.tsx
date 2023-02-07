import { observer } from 'mobx-react'
import { ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect } from 'react'

import {
  CardBody,
  CreateMindHeader,
  Profile
} from 'components/BottomPanel/content/CreateMind/components'
import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

export const CreateMind = observer(() => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  useEffect(() => {
    createMindVM.cleanAll()
  })

  return (
    <View style={[SS.container]}>
      <CreateMindHeader />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView automaticallyAdjustKeyboardInsets={true}>
          <Profile />
          <CardBody />
          {createMindVM.pending && (
            <View style={SS.loading}>
              <ActivityIndicator size="large" color="#D3D3D3" />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
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
