import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILayoutService, ILayoutServiceTid } from 'services'
import { IScreenContainerProps } from 'components/ScreenContainer/types'

export const ScreenContainer: FC<IScreenContainerProps> = observer(
  ({ bottomInsetColor, topInsetColor, children, style }) => {
    const layoutService = useInject<ILayoutService>(ILayoutServiceTid)

    return (
      <Animated.View
        style={[SS.container, { paddingBottom: layoutService.keyboardHeight }]}
      >
        <View
          style={{
            height: layoutService.insets.top,
            backgroundColor: topInsetColor
          }}
        />
        <View style={[SS.container, style && style]}>{children}</View>
        <View
          style={{
            height: layoutService.keyboardIsVisible
              ? 0
              : layoutService.insets.bottom,
            backgroundColor: bottomInsetColor
          }}
        />
      </Animated.View>
    )
  }
)

const SS = StyleSheet.create({
  container: {
    flex: 1
  }
})
