import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg viewBox="0 0 10 17" fill="none" {...props}>
    <Path
      d="m1 1 8 7.5L1 16"
      stroke="#549EF7"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const SvgPointerRight = createSvg({
  component: Component,
  originalHeight: 24,
  originalWidth: 24
})
