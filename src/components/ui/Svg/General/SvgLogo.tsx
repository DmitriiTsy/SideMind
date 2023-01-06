import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => {
  return (
    <Svg viewBox="0 0 25 24" fill="none" {...props}>
      <Path
        d="M21.877 6.418a.963.963 0 0 1-.302-.456 7.003 7.003 0 0 0-9.238-4.487.934.934 0 0 1-.675 0 7.003 7.003 0 0 0-9.238 4.486.963.963 0 0 1-.3.457A5.985 5.985 0 0 0 0 10.995a6.001 6.001 0 0 0 4.662 5.849c.504.115.83.606.733 1.115l-.747 3.944c-.165.87.894 1.43 1.52.804l5.274-5.024a.964.964 0 0 1 1.278-.04c.689.562 1.569.9 2.527.9a3.99 3.99 0 0 0 2.95-1.3.938.938 0 0 1 .572-.297 6 6 0 0 0 3.108-10.528Zm-3.99 2.346-2.305 2.304-3.613 3.614a.48.48 0 0 1-.811-.428l.493-2.617a.48.48 0 0 0-.472-.569H6.453a.48.48 0 0 1-.34-.82l2.305-2.303L12.162 4.2a.48.48 0 0 1 .81.428l-.518 2.746a.48.48 0 0 0 .472.569h4.621a.48.48 0 0 1 .34.82Z"
        fill="#fff"
      />
    </Svg>
  )
}

export const SvgLogo = createSvg({
  component: Component,
  originalHeight: 24,
  originalWidth: 24
})
