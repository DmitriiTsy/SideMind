import React, { FC } from 'react'

import Svg, { Path, Defs, G, ClipPath } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg viewBox="0 0 20 20" fill="none" {...props}>
    <G
      clipPath="url(#a)"
      stroke="#fff"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.166 3.333H3.333A1.667 1.667 0 0 0 1.666 5v11.667a1.666 1.666 0 0 0 1.667 1.666h11.666a1.667 1.667 0 0 0 1.667-1.666v-5.834" />
      <Path d="M15.416 2.083a1.768 1.768 0 0 1 2.5 2.5L9.999 12.5l-3.333.833L7.499 10l7.917-7.917Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h20v20H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)

export const SvgAddNote = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 20
})
