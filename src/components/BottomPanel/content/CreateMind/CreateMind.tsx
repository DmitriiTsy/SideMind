import { observer } from 'mobx-react'
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native'
import React, { useRef } from 'react'

import { useInject } from 'IoC'
import { ICreateMindVM, ICreateMindVMTid } from 'components/BottomPanel/content'

import { EAvatarsCategory } from 'services/FirebaseService/types'

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
    refScrollView?.current?.scrollToEnd({ animated: true })
  }

  return (
    <View style={[SS.container]}>
      <CreateMindHeader />
      <ScrollView
        ref={refScrollView}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'handled'}
        onContentSizeChange={onContentSizeChange}
      >
        <CreateMindPickImage />
        {createMindVM.editingAvatar &&
          createMindVM.editingAvatar.category === EAvatarsCategory.Custom && (
            <CreateMindShare />
          )}
        <CreateMindInputs />
      </ScrollView>
      {/*<View*/}
      {/*  style={{*/}
      {/*    flexDirection: 'row',*/}
      {/*    height: 56,*/}
      {/*    borderTopLeftRadius: 12,*/}
      {/*    borderTopRightRadius: 12,*/}
      {/*    alignItems: 'center',*/}
      {/*    justifyContent: 'space-between',*/}
      {/*    paddingHorizontal: 24*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Pressable>*/}
      {/*    <Text*/}
      {/*      style={{*/}
      {/*        fontWeight: '700',*/}
      {/*        fontSize: 16,*/}
      {/*        color: '#559EF8',*/}
      {/*        lineHeight: 16*/}
      {/*      }}*/}
      {/*    >*/}
      {/*      Cancel*/}
      {/*    </Text>*/}
      {/*  </Pressable>*/}
      {/*  <Text*/}
      {/*    style={{*/}
      {/*      fontWeight: '500',*/}
      {/*      fontSize: 16,*/}
      {/*      color: '#FFFFFF',*/}
      {/*      lineHeight: 16,*/}
      {/*      letterSpacing: -0.3*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    AI GENERATED AVATAR*/}
      {/*  </Text>*/}
      {/*  <Pressable>*/}
      {/*    <Text>Done</Text>*/}
      {/*  </Pressable>*/}
      {/*</View>*/}
      {/*<View>*/}
      {/*  <Input*/}
      {/*    vm={createMindVM.inputGenerateAvatar}*/}
      {/*    style={{ marginTop: 21 }}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*<Pressable style={{ marginTop: 21 }} onPress={generateImage}>*/}
      {/*  <Text>Generate avatar</Text>*/}
      {/*</Pressable>*/}
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
