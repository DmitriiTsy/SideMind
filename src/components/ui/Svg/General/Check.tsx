import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect x={0.5} y={1} width={19} height={19} rx={9.5} fill="#559EF8" />
    <Path d="m5 10.5 3 3 7-7" stroke="#1C1C1D" />
    <Rect x={0.5} y={1} width={19} height={19} rx={9.5} stroke="#484849" />
  </Svg>
)

export const SvgCheck = createSvg({
  component: Component,
  originalHeight: 21,
  originalWidth: 20
})
