import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M54 108c29.541 0 54-24.512 54-54C108 24.46 83.488 0 53.947 0 24.46 0 0 24.459 0 54c0 29.488 24.512 54 54 54Z"
      fill="#9A9EA8"
    />
    <Path
      d="M53.736 99.563c-12.076 0-24.31-4.957-32.379-13.553 5.696-8.965 18.088-14.239 32.38-14.239 14.185 0 26.683 5.168 32.431 14.239-8.121 8.596-20.303 13.552-32.432 13.552Zm0-36.756c-10.125-.106-18.088-8.543-18.088-19.881-.052-10.653 8.016-19.512 18.088-19.512 10.125 0 18.088 8.86 18.088 19.512 0 11.338-7.91 19.986-18.088 19.88Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgAvatarEmpty = createSvg({
  component: Component,
  originalHeight: 108,
  originalWidth: 108
})
