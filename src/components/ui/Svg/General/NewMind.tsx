import React, { FC } from 'react'

import Svg, { Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect y={0.5} width={36} height={36} rx={18} fill="#2C2C2D" />
    <Path
      d="M13.141 25h8.95c.714 0 1.141-.334 1.141-.888 0-1.722-2.155-4.098-5.62-4.098-3.456 0-5.612 2.376-5.612 4.098 0 .554.427.888 1.141.888Zm4.479-6.18c1.428 0 2.67-1.282 2.67-2.95 0-1.649-1.242-2.87-2.67-2.87-1.429 0-2.67 1.248-2.67 2.883 0 1.655 1.235 2.937 2.67 2.937Z"
      fill="#559EF8"
    />
    <Path
      d="M22.135 26.615c0 .26.088.509.27.694a.968.968 0 0 0 .7.277c.27 0 .522-.09.707-.276a.967.967 0 0 0 .274-.695v-1.539h1.53a.97.97 0 0 0 .698-.272.97.97 0 0 0 .272-.698.97.97 0 0 0-.272-.7.97.97 0 0 0-.699-.271h-1.53v-1.54c0-.26-.088-.51-.273-.694a.982.982 0 0 0-.707-.276.968.968 0 0 0-.7.277.971.971 0 0 0-.27.694v1.539h-1.53a.986.986 0 0 0-.7.269.964.964 0 0 0-.28.701c0 .268.092.519.28.702.187.183.438.27.7.27h1.53v1.538Z"
      fill="#559EF8"
      stroke="#2C2C2D"
      strokeWidth={0.75}
    />
  </Svg>
)

export const SvgNewMind = createSvg({
  component: Component,
  originalHeight: 36,
  originalWidth: 36
})
