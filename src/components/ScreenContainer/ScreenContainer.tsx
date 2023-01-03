import React from 'react'
import { StyleSheet, View } from 'react-native'
import { FC } from 'react'

import { useInject } from 'IoC'
import { ILayoutService, ILayoutServiceTid } from 'services'
import { IScreenContainerProps } from 'components/ScreenContainer/types'

export const ScreenContainer: FC<IScreenContainerProps> = ({
  bottomInsetColor,
  topInsetColor,
  children,
  style
}) => {
  const _layoutService = useInject<ILayoutService>(ILayoutServiceTid)
  return (
    <View style={SS.container}>
      <View
        style={{
          height: _layoutService.insets.top,
          backgroundColor: topInsetColor
        }}
      />
      <View style={[SS.container, style && style]}>{children}</View>
      <View
        style={{
          height: _layoutService.insets.bottom,
          backgroundColor: bottomInsetColor
        }}
      />
    </View>
  )
}

const SS = StyleSheet.create({
  container: {
    flex: 1
  }
})
