import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M3.85 4.399H5.13V2.517c0-.786.42-1.239 1.247-1.239h3.509v4.073c0 .921.444 1.358 1.357 1.358h3.716v6.789c0 .793-.428 1.238-1.254 1.238H12.14v1.278h1.635c1.636 0 2.462-.841 2.462-2.493V7.074c0-.976-.199-1.596-.794-2.207L11.433.794C10.87.214 10.203 0 9.353 0H6.312C4.676 0 3.851.842 3.851 2.493V4.4Zm7.186.762V1.906l3.589 3.652h-3.2c-.278 0-.389-.12-.389-.397ZM0 17.483c0 1.66.818 2.493 2.461 2.493h7.464c1.643 0 2.46-.841 2.46-2.493v-6.2c0-1.017-.118-1.462-.753-2.113L7.257 4.716c-.604-.62-1.104-.754-1.993-.754H2.461C.826 3.962 0 4.796 0 6.455v11.028Zm1.278-.024V6.471c0-.778.421-1.23 1.247-1.23h2.604v4.604c0 1 .508 1.5 1.493 1.5h4.486v6.114c0 .794-.43 1.239-1.247 1.239H2.517c-.818 0-1.239-.445-1.239-1.239Zm5.495-7.312c-.318 0-.445-.127-.445-.445V5.534l4.533 4.613H6.773Z"
      fill="#fff"
    />
  </Svg>
)

export const SvgCopy = createSvg({
  component: Component,
  originalHeight: 20,
  originalWidth: 16
})
