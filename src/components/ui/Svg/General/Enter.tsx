import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg viewBox="0 0 28 28" fill="none" {...props}>
    <Rect width={28} height={28} rx={14} fill="#222" />
    <Path
      opacity={0.4}
      d="M21.941 13.056 8.261 7.319a.5.5 0 0 0-.693.502l.397 4.755a.5.5 0 0 0 .46.457l6.075.467-6.11.94a.5.5 0 0 0-.423.453l-.396 4.76a.5.5 0 0 0 .704.497l13.678-6.177a.5.5 0 0 0-.012-.917Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgEnter = createSvg({
  component: Component,
  originalHeight: 28,
  originalWidth: 28
})
