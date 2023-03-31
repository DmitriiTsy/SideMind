import React, { FC } from 'react'

import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Rect y="0.5" width="24" height="24" rx="6" fill="#65C466" />
    <G clip-path="url(#clip0_2551_157929)">
      <Path
        d="M7.51953 20.7383H16.4805C18.1133 20.7383 18.9336 19.9258 18.9336 18.3164V10.5195C18.9336 8.91016 18.1133 8.09766 16.4805 8.09766H14.3008V9.35547H16.457C17.2305 9.35547 17.6758 9.77735 17.6758 10.5898V18.2461C17.6758 19.0586 17.2305 19.4805 16.457 19.4805H7.53516C6.75391 19.4805 6.32422 19.0586 6.32422 18.2461V10.5898C6.32422 9.77735 6.75391 9.35547 7.53516 9.35547H9.69922V8.09766H7.51953C5.88672 8.09766 5.06641 8.91016 5.06641 10.5195V18.3164C5.06641 19.9258 5.88672 20.7383 7.51953 20.7383ZM11.9961 14.6211C12.332 14.6211 12.6211 14.3399 12.6211 14.0117V5.98828L12.5742 4.81641L13.0977 5.37109L14.2852 6.63672C14.3945 6.76172 14.5508 6.82422 14.707 6.82422C15.0273 6.82422 15.2773 6.58985 15.2773 6.26953C15.2773 6.10547 15.207 5.98047 15.0898 5.86328L12.4492 3.31641C12.293 3.16016 12.1602 3.10547 11.9961 3.10547C11.8398 3.10547 11.707 3.16016 11.543 3.31641L8.90235 5.86328C8.78516 5.98047 8.72266 6.10547 8.72266 6.26953C8.72266 6.58985 8.95703 6.82422 9.28516 6.82422C9.4336 6.82422 9.60547 6.76172 9.71485 6.63672L10.8945 5.37109L11.4258 4.81641L11.3789 5.98828V14.0117C11.3789 14.3399 11.6602 14.6211 11.9961 14.6211Z"
        fill="white"
      />
    </G>
    <Defs>
      <ClipPath id="clip0_2551_157929">
        <Rect
          width="13.8672"
          height="18.7891"
          fill="white"
          transform="translate(5.06641 3.10547)"
        />
      </ClipPath>
    </Defs>
  </Svg>
)

export const SvgShare = createSvg({
  component: Component,
  originalHeight: 25,
  originalWidth: 24
})
