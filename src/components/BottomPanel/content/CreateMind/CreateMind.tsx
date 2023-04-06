import { observer } from 'mobx-react'
import { ScrollView, StyleSheet } from 'react-native'
import React, { useRef } from 'react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { ScreenContainer } from 'components/ScreenContainer'

import { Loader } from 'components/BottomPanel/content/CreateMind/components/Loader'

import {
  CreateMindHeader,
  CreateMindInputs,
  CreateMindPickImage,
  CreateMindShare
} from './components'

export const CreateMind = observer(() => {
  const createMindVM = useInject<ICreateMindVM>(ICreateMindVMTid)

  const refScrollView = useRef<ScrollView>()

  const onContentSizeChange = () => {
    refScrollView?.current?.scrollToEnd()
  }

  if (createMindVM.pending) {
    return <Loader />
  }

  return (
    <ScreenContainer
      topInsetColor={'#1C1C1E'}
      bottomInsetColor={'#1C1C1E'}
      topInset={false}
      bottomInset={false}
      style={SS.container}
    >
      <CreateMindHeader />
      <ScrollView
        ref={refScrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        onContentSizeChange={onContentSizeChange}
      >
        <CreateMindPickImage />

        {createMindVM.editableAvatar && <CreateMindShare />}

        <CreateMindInputs />
      </ScrollView>
    </ScreenContainer>
  )
})

const SS = StyleSheet.create({
  container: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#1C1C1E'
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
