import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { BlurView } from '@react-native-community/blur'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { IBlurVM, IBlurVMTid } from 'components/Blur/Blur.vm'

export const Blur = observer(() => {
  const blurVM = useInject<IBlurVM>(IBlurVMTid)

  if (!blurVM.content) {
    return null
  }

  return (
    <Pressable style={SS.container} onPress={blurVM.hide}>
      <BlurView
        style={SS.container}
        blurType="dark"
        blurAmount={6}
        reducedTransparencyFallbackColor="white"
        blurRadius={25}
      >
        {blurVM.content()}
      </BlurView>
    </Pressable>
  )
})

const SS = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
})
