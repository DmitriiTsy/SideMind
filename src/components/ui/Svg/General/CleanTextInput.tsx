import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect x={0.5} y={1} width={19} height={19} rx={9.5} fill="#484848" />
    <Path
      d="M7.705 14.217a.5.5 0 1 1-.707-.707l5.657-5.657a.5.5 0 1 1 .707.707l-5.657 5.657Z"
      fill="#222"
    />
    <Path
      d="M6.853 8.705a.5.5 0 0 1 .708-.707l5.656 5.657a.5.5 0 1 1-.707.707L6.853 8.705Z"
      fill="#222"
    />
    <Rect x={0.5} y={1} width={19} height={19} rx={9.5} stroke="#484849" />
  </Svg>
)

export const SvgCleanTextInput = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 20
})
