import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect y={0.244} width={28} height={28} rx={14} fill="#549EF7" />
    <Path
      d="M21.941 13.3 8.261 7.561a.5.5 0 0 0-.693.503l.397 4.754a.5.5 0 0 0 .46.457l6.075.468-6.11.94a.5.5 0 0 0-.423.452l-.396 4.76a.5.5 0 0 0 .704.498l13.678-6.178a.5.5 0 0 0-.012-.916Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgEnterActive = createSvg({
  component: Component,
  originalHeight: 28,
  originalWidth: 28
})
