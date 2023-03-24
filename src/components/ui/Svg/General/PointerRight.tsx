import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M1.1 0.999999L7.5 7L1.1 13"
      stroke="#59595D"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
)

export const SvgPointerRight = createSvg({
  component: Component,
  originalHeight: 14,
  originalWidth: 9
})
