import React, { FC } from 'react'

import { Pressable, View } from 'react-native'

import { ISvgProps } from 'components/ui/Svg/Svg.types'
import { SVG_MAP } from 'components/ui/Svg/constants'

export const Svg: FC<ISvgProps> = (props) => {
  const { onPress, hitSlop, style, name, ...componentProps } = props
  const Component = SVG_MAP[name]
  if (onPress !== undefined) {
    return (
      <Pressable onPress={onPress} hitSlop={hitSlop} style={style}>
        <Component {...componentProps} />
      </Pressable>
    )
  }
  return (
    <View style={style}>
      <Component {...componentProps} />
    </View>
  )
}
