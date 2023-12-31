import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg width={10} height={18} fill="none" {...props}>
    <Path
      d="M9 16.5 1 9l8-7.5"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const SvgPointerLeft = createSvg({
  component: Component,
  originalHeight: 18,
  originalWidth: 10
})
