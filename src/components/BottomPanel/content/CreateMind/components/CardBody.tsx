import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import { CardInput } from './CardInput'

enum texts {
  FullName = 'Full Name',
  TagLine = 'Tagline',
  Bio = 'Bio'
}

enum placeholder {
  FullName = 'Enter first name',
  Tagline = 'Enter tagline',
  Bio = 'Enter bio'
}
export const CardBody = observer(() => {
  return (
    <View style={SS.container}>
      <CardInput hint={texts.FullName} placeholder={placeholder.FullName} />
      <CardInput hint={texts.TagLine} placeholder={placeholder.Tagline} />
      <CardInput hint={texts.Bio} placeholder={placeholder.Bio} />
    </View>
  )
})

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 52,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  }
})
