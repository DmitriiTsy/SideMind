import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M6.174 15.362a.833.833 0 0 1-1.178-1.178l9.428-9.428a.833.833 0 1 1 1.178 1.178l-9.428 9.428Z"
      fill="#fff"
    />
    <Path
      d="M4.754 6.176a.833.833 0 0 1 1.179-1.179l9.428 9.428a.834.834 0 0 1-1.178 1.18L4.754 6.175Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgCross = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 20
})
