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
      <Path d="M17.167 11.332h-5.834a1.667 1.667 0 0 0-1.666 1.667v11.666a1.667 1.667 0 0 0 1.666 1.667H23a1.667 1.667 0 0 0 1.667-1.667v-5.833" />
      <Path d="M23.417 10.084a1.768 1.768 0 0 1 2.5 2.5L18 20.501l-3.333.833.833-3.333 7.917-7.917Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(8 8)" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export const SvgAddNote = createSvg({
  component: Component,
  originalHeight: 36,
  originalWidth: 36
})
