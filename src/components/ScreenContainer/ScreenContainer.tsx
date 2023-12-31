import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { observer } from 'mobx-react'

import { useInject } from 'IoC'
import { ILayoutService, ILayoutServiceTid } from 'services'
import { IScreenContainerProps } from 'components/ScreenContainer/types'

export const ScreenContainer: FC<IScreenContainerProps> = observer(
  ({
    bottomInsetColor,
    topInsetColor,
    children,
    style,
    topInset = true,
    bottomInset = true
  }) => {
    const layoutService = useInject<ILayoutService>(ILayoutServiceTid)

    return (
      <View style={{ backgroundColor: 'black', flex: 1 }}>
        <Animated.View
          style={[
            SS.container,
            { paddingBottom: layoutService.keyboardHeight }
          ]}
        >
          {topInset && (
            <View
              style={{
                height: layoutService.insets.top,
                backgroundColor: topInsetColor
              }}
            />
          )}
          <View style={[SS.container, style && style]}>{children}</View>
          {bottomInset && (
            <View
              style={{
                height: layoutService.keyboardIsVisible
                  ? 0
                  : layoutService.insets.bottom,
                backgroundColor: bottomInsetColor
              }}
            />
          )}
        </Animated.View>
      </View>
    )
  }
)

const SS = StyleSheet.create({
  container: {
    flex: 1
  }
})
