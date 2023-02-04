import React from 'react'
import { Pressable, StyleSheet, View, Text, ActivityIndicator } from 'react-native'
import { observer } from 'mobx-react'
import { useInject } from 'IoC/'
import {
  IContactCardVM,
  IContactCardVMTid
} from 'components/BottomPanel/content'
import { Svg } from 'components/ui/Svg'

enum texts {
  Edit = 'Edit Avatar'
}

export const Profile = observer(() => {
  const AvatarChooseHandler = () => {
    console.log('')
  }
  const vm = useInject<IContactCardVM>(IContactCardVMTid)
  return (
    <View style={SS.container}>
      {vm.pending ? (
        <ActivityIndicator size="large" color="#D3D3D3" />
      ) : (
        <>
          <Pressable onPress={AvatarChooseHandler}>
            <Svg name={'AvatarEmpty'} />
          </Pressable>
          <Pressable style={SS.textsWrapper} onPress={AvatarChooseHandler}>
            <Text style={SS.texts}>{texts.Edit}</Text>
          </Pressable>
        </>
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
    paddingVertical: 16
  },
  texts: {
    fontWeight: '500',
    fontSize: 16,
    color: '#559EF8',
    lineHeight: 16,
    letterSpacing: -0.3
  }
})
