import React from 'react'
import { StyleSheet, TextInput, View, Text } from 'react-native'

export const CardInput = (props: { hint: any; placeholder: any }) => {
  const hints = props.hint
  const placeholder = props.placeholder

  return (
  <View style={SS.container}>
    <Text>{hints}</Text>
    <TextInput placeholder={placeholder}></TextInput>
  </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: 90,
    backgroundColor: '#1C1C1E',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 14
  }
})
