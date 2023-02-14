import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg viewBox="0 0 36 36" fill="none" {...props}>
    <Rect y={0.244} width={36} height={36} rx={14} fill="#549EF7" />
    <Path
      d="m24.441 17.056-13.68-5.737a.5.5 0 0 0-.693.502l.397 4.755a.5.5 0 0 0 .46.457L17 17.5l-6.11.94a.5.5 0 0 0-.423.453l-.396 4.76a.5.5 0 0 0 .704.497l13.678-6.177a.5.5 0 0 0-.012-.917Z"
      fill="#fff"
    />
</Svg>
)

export const SvgEnterActive = createSvg({
  component: Component,
  originalHeight: 36,
  originalWidth: 36
})
