import { StyleSheet, View } from 'react-native'
import React, { FC, useEffect } from 'react'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming
} from 'react-native-reanimated'
import range from 'lodash/range'

import { SkeletonHeader } from 'components/SelectAvatars/components/skeleton/SkeletonHeader'

interface ISkeletonComponentProps {
  animatedStyle: {
    backgroundColor: string
  }
}

export const SkeletonAvatars = () => {
  const state = useSharedValue('#484849')

  useEffect(() => {
    state.value = withRepeat(
      withTiming('#4848494D', { duration: 500 }),
      -1,
      true
    )
  }, [])

  const animatedStyle = useAnimatedStyle(
    () => ({
      backgroundColor: state.value
    }),
    []
  )
  return (
    <View style={{ backgroundColor: '#1C1C1E', flex: 1 }}>
      <SkeletonHeader />
      {range(3).map((_, index) => (
        <GroupedSkeletonAvatars animatedStyle={animatedStyle} key={index} />
      ))}
    </View>
  )
}

const GroupedSkeletonAvatars: FC<ISkeletonComponentProps> = ({
  animatedStyle
}) => {
  return (
    <View style={{ marginLeft: 19 }}>
      <View style={SS.header_container}>
        <Animated.View style={[SS.header_text, animatedStyle]}></Animated.View>
      </View>
      {range(3).map((_, index) => (
        <SkeletonAvatar animatedStyle={animatedStyle} key={index} />
      ))}
    </View>
  )
}

const SkeletonAvatar: FC<ISkeletonComponentProps> = ({ animatedStyle }) => {
  return (
    <View style={SS.pendingContainer}>
      <Animated.View style={[SS.image, animatedStyle]}></Animated.View>
      <View style={SS.textWrapper}>
        <Animated.View style={[SS.textHeader, animatedStyle]}></Animated.View>
        <Animated.View style={[SS.textRegular, animatedStyle]}></Animated.View>
      </View>
    </View>
  )
}

const SS = StyleSheet.create({
  pendingContainer: {
    height: 45,
    width: '100%',
    backgroundColor: '#1C1C1E',
    borderBottomLeftRadius: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  image: {
    borderRadius: 25,
    width: 36,
    height: 36,
    marginRight: 12
  },
  textHeader: {
    width: 81,
    height: 12,
    borderRadius: 25,
    marginBottom: 2
  },
  textRegular: {
    width: 162,
    height: 8,
    borderRadius: 25
  },
  textWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 45,
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
    width: '100%'
  },
  pendingDot: {
    height: 5,
    width: 5,
    backgroundColor: 'white',
    margin: 2,
    borderRadius: 7
  },
  header_container: {
    borderBottomColor: '#333333',
    borderBottomWidth: 0.5,
    width: '100%',
    height: 45,
    justifyContent: 'flex-end',
    paddingBottom: 8
  },
  header_text: {
    width: 130,
    height: 12,
    borderRadius: 25
  }
})
