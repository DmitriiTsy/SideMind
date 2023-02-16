import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M6.175 15.363a.833.833 0 1 1-1.179-1.178l9.429-9.429a.833.833 0 1 1 1.179 1.179l-9.429 9.428Z"
      fill="#fff"
    />
    <Path
      d="M4.756 6.178a.833.833 0 0 1 1.179-1.179l9.427 9.429a.833.833 0 1 1-1.178 1.178L4.756 6.178Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgCross = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 20
})
