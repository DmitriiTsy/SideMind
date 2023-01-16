import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg viewBox="0 0 17 20" fill="none" {...props}>
    <Path
      d="M15.4 11.8a7.2 7.2 0 1 1-7.2-7.2"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
    />
    <Path
      d="M6.4 1 10 4.6 6.4 8.2"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const SvgReset = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 16
})
