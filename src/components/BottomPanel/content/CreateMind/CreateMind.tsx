import { observer } from 'mobx-react'
import { StyleSheet, View } from 'react-native'
import React from 'react'

import {
  CardBody,
  CardHeader,
  Profile
} from 'components/BottomPanel/content/CreateMind/components'

export const CreateMind = observer(() => {
  return (
    <View style={SS.container}>
      <CardHeader />
      <Profile />
      <CardBody />
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
})
