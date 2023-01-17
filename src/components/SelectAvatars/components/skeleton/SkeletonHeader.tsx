import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

import range from 'lodash/range'

import { useInject } from 'IoC'
import { ILocalizationService, ILocalizationServiceTid } from 'services'

export const SkeletonHeader = () => {
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const [state, setState] = useState(1)

  useEffect(() => {
    const id = setInterval(() => {
      setState(state === 3 ? 1 : state + 1)
    }, 500)
    return function () {
      clearInterval(id)
    }
  })
  return (
    <>
      <View style={SS.container}>
        <Text style={SS.title}>{`${t.get('loading ais')}`}</Text>
        {range(state).map((_, index) => (
          <Text style={SS.title} key={index}>
            .
          </Text>
        ))}
      </View>
      <View style={SS.separator} />
    </>
  )
}

const SS = StyleSheet.create({
  container: {
    height: 45,
    backgroundColor: '#1C1C1E',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  separator: {
    height: 0.5,
    backgroundColor: '#333333',
    marginLeft: 66
  },
  title: {
    textAlign: 'center',
    color: '#98989E'
  }
})
