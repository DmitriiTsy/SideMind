import React, { FC } from 'react'

import Svg, { Path, Defs, G, ClipPath, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect width={36} height={36} rx={18} fill="#1C1C1E" />
    <G
      clipPath="url(#a)"
      stroke="#549EF7"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M17.332 12.666h-4.667A1.333 1.333 0 0 0 11.332 14v9.333a1.333 1.333 0 0 0 1.333 1.334H22a1.333 1.333 0 0 0 1.333-1.334v-4.666" />
      <Path d="M22.332 11.667a1.414 1.414 0 1 1 2 2L17.999 20l-2.667.667.667-2.667 6.333-6.333Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(10 10)" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export const SvgAddNote = createSvg({
  component: Component,
  originalHeight: 36,
  originalWidth: 36
})
