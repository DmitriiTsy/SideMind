import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import { CardHeader } from './components'
import { Profile } from './components'
import { CardBody } from './components'

export const ContactCard = observer(() => {
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
    borderTopRightRadius: 12,
    paddingHorizontal: 14
  }
})
