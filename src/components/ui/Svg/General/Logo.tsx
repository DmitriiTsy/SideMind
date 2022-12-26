import React, { FC } from 'react'

import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => {
  return (
    <Svg fill="none" {...props}>
      <Path
        d="m38.91 11.732-.001-.002a1.684 1.684 0 0 1-.527-.797C36.854 5.907 32.184 2.25 26.659 2.25c-1.568 0-3.067.294-4.445.832a1.634 1.634 0 0 1-1.18 0 12.23 12.23 0 0 0-4.445-.832c-5.523 0-10.193 3.657-11.72 8.683a1.686 1.686 0 0 1-.528.798 10.474 10.474 0 0 0-3.716 8.01c0 4.994 3.487 9.172 8.158 10.236a1.682 1.682 0 0 1 1.284 1.952L8.759 38.83c-.288 1.523 1.565 2.503 2.661 1.407l9.23-8.792a1.687 1.687 0 0 1 2.235-.072 6.97 6.97 0 0 0 4.423 1.577 6.983 6.983 0 0 0 5.163-2.275 1.641 1.641 0 0 1 1-.521c5.163-.661 9.154-5.068 9.154-10.412a10.474 10.474 0 0 0-3.716-8.011Zm-6.984 4.104v.002l-4.032 4.031-6.324 6.324c-.583.584-1.572.063-1.42-.75l.865-4.579a.84.84 0 0 0-.826-.995h-8.272a.84.84 0 0 1-.593-1.434l4.032-4.032 6.552-6.552c.584-.583 1.572-.063 1.42.75l-.908 4.806a.84.84 0 0 0 .826.995h8.087a.84.84 0 0 1 .593 1.434Z"
        fill="url(#a)"
      />
      <Path
        d="m31.928 15.836-4.032 4.032-6.323 6.324c-.584.584-1.573.063-1.42-.749l.864-4.58a.84.84 0 0 0-.826-.995H11.92a.84.84 0 0 1-.594-1.433l4.032-4.032L21.91 7.85c.584-.584 1.572-.063 1.42.749l-.907 4.806a.84.84 0 0 0 .826.995h8.086c.749 0 1.123.906.593 1.435Z"
        fill="#fff"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={42.625}
          y1={40.705}
          x2={-6.052}
          y2={28.163}
          gradientUnits="userSpaceOnUse"
        >
          <Stop offset={0.245} stopColor="#7E13FF" />
          <Stop offset={0.953} stopColor="#EB16D5" />
        </LinearGradient>
      </Defs>
    </Svg>
  )
}

export const SvgLogo = createSvg({
  component: Component,
  originalHeight: 43,
  originalWidth: 44
})
