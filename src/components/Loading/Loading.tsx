import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, Text, Animated } from 'react-native'

import range from 'lodash/range'

import { useInject } from 'IoC'
import {
  ILocalizationService,
  ILocalizationServiceTid
} from 'services/LocalizationService/LocalizationService'

import { INavigationService, INavigationServiceTid } from 'services'
import { ScreenContainer } from 'components/ScreenContainer'
import { CommonScreenName } from 'constants/screen.types'

import { LoadingHeader } from './components/LoadingHeader'

import { OneBot } from './components/OneBot'

export const Loading = () => {
  const animation = useRef(new Animated.Value(0)).current
  const t = useInject<ILocalizationService>(ILocalizationServiceTid)
  const navigation = useInject<INavigationService>(INavigationServiceTid)

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false
    }).start(() => {
      return Animated.timing(animation, {
        toValue: 2,
        duration: 400,
        useNativeDriver: false
      }).start(() => {
        return Animated.timing(animation, {
          toValue: 3,
          duration: 400,
          useNativeDriver: false
        }).start(() => {
          return Animated.timing(animation, {
            toValue: 4,
            duration: 400,
            useNativeDriver: false
          }).start(() => {
            return Animated.timing(animation, {
              toValue: 5,
              duration: 400,
              useNativeDriver: false
            }).start(() => {
              return Animated.timing(animation, {
                toValue: 6,
                duration: 400,
                useNativeDriver: false
              }).start()
            })
          })
        })
      })
    })
  }

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1, 2, 3, 4, 5, 6],
    outputRange: [
      'rgba(72, 72, 73, 0.3)',
      '#484849',
      'rgba(72, 72, 73, 0.3)',
      '#484849',
      'rgba(72, 72, 73, 0.3)',
      '#484849',
      'rgba(72, 72, 73, 0.3)'
    ]
  })

  useEffect(() => {
    setTimeout(() => navigation.navigate(CommonScreenName.SelectBots), 3000)
  })

  const animatedStyle = {
    backgroundColor: boxInterpolation
  }
  const header = () => (
    <View style={SS.header_container}>
      <Animated.View
        style={{ ...SS.header_text, ...animatedStyle }}
      ></Animated.View>
    </View>
  )

  startAnimation()
  return (
    <ScreenContainer
      topInsetColor={'#1C1C1E'}
      bottomInsetColor={'#1C1C1E'}
      style={SS.screenContainer}
    >
      <LoadingHeader />
      <View style={SS.loadingWrapper}>
        <Text style={SS.loadingAI}>{t.get('loading ais')}</Text>
        <Text style={SS.loadingDot}>{t.get('waiting dot')}</Text>
      </View>
      <View style={SS.pendingContainer}>
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} props={animatedStyle} />
        ))}
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} props={animatedStyle} />
        ))}
        {header()}
        {range(3).map((_, index) => (
          <OneBot key={index} props={animatedStyle} />
        ))}
      </View>
    </ScreenContainer>
  )
}

const SS = StyleSheet.create({
  header_container: {
    borderBottomColor: 'rgba(72, 72, 73, 0.3)',
    borderBottomWidth: 0.5,
    width: '100%',
    height: 45,
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  header_text: {
    backgroundColor: 'rgba(72, 72, 73, 0.3)',
    width: 130,
    height: 12,
    borderRadius: 25
  },
  title: {
    color: '#1C1C1E',
    fontWeight: '700',
    fontSize: 20
  },
  screenContainer: {
    backgroundColor: '#1C1C1E'
  },
  pendingContainer: {
    backgroundColor: '#1C1C1E',
    marginLeft: 14,
    marginVertical: 12,
    borderRadius: 12,
    borderBottomLeftRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingLeft: 18
  },
  loadingWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 45,
    paddingVertical: 16.5,
    paddingHorizontal: 18,
    borderBottomColor: 'rgba(72, 72, 73, 0.3)',
    borderBottomWidth: 0.5
  },
  loadingAI: {
    textAlign: 'center',
    color: '#98989E',
    fontWeight: '400',
    lineHeight: 12,
    fontSize: 12,
    letterSpacing: 0.2,
    paddingRight: 2
  },
  loadingDot: {
    textAlign: 'center',
    color: '#98989E',
    fontWeight: '400',
    lineHeight: 12,
    fontSize: 12,
    letterSpacing: 0.2
  }
})
