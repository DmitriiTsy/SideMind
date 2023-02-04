import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer } from 'mobx-react'

import { CardInput } from './CardInput'

enum texts {
  FullName = 'Full Name',
  Tagline = 'Tagline',
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
      {Object.keys(texts).map((text, index) => (
        <CardInput
          hint={texts[text]}
          key={index}
          placeholder={placeholder[text]}
        />
      ))}
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
