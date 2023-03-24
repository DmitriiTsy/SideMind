import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
  <Svg fill="none" {...props}>
    <Path
      d="M12.0781 12.1562V13.414H15.9844C18.3828 13.414 19.8203 11.9688 19.8203 10.0781C19.8203 8.5 18.875 7.20313 17.3516 6.58594C17.3672 3.10156 14.8594 0.585938 11.6641 0.585938C9.54688 0.585938 8.03907 1.71875 7.10157 3.08594C5.32813 2.60937 3.08594 3.98437 3.04688 6.17969C1.28125 6.45313 0.179688 7.89844 0.179688 9.74219C0.179688 11.7734 1.70313 13.414 4.26563 13.414H7.99219V12.1562H4.25781C2.40625 12.1562 1.4375 11.0859 1.4375 9.74219C1.4375 8.25 2.38281 7.14063 4.03907 7.14063C4.14844 7.14063 4.1875 7.07813 4.1875 6.97656C4.1875 4.57813 5.91407 3.91406 7.52344 4.38281C7.61719 4.41406 7.67188 4.39844 7.71875 4.3125C8.47657 2.96094 9.64063 1.84375 11.6641 1.84375C14.2266 1.84375 16 3.875 16.1328 6.20313C16.1563 6.55469 16.1328 6.97656 16.1016 7.34375C16.0938 7.44531 16.1328 7.50781 16.2266 7.52344C17.6485 7.83594 18.5625 8.72656 18.5625 10.0781C18.5625 11.2812 17.6875 12.1562 15.9766 12.1562H12.0781ZM10.0391 17.414C10.375 17.414 10.6563 17.1406 10.6563 16.8125V9.48437L10.6094 8.03906L11.1328 8.59375L12.3203 9.77344C12.4375 9.89063 12.5938 9.96094 12.7422 9.96094C13.0625 9.96094 13.3125 9.73437 13.3125 9.41406C13.3125 9.25 13.25 9.10937 13.125 9L10.4844 6.53125C10.3203 6.38281 10.1953 6.32813 10.0391 6.32813C9.875 6.32813 9.75 6.38281 9.58594 6.53125L6.94531 9C6.82031 9.10937 6.75781 9.25 6.75781 9.41406C6.75781 9.73437 6.99219 9.96094 7.32031 9.96094C7.46875 9.96094 7.63281 9.89063 7.75 9.77344L8.9375 8.59375L9.46094 8.03906L9.41407 9.48437V16.8125C9.41407 17.1406 9.70313 17.414 10.0391 17.414Z"
      fill="white"
    />
  </Svg>
)

export const SvgShareApp = createSvg({
  component: Component,
  originalHeight: 18,
  originalWidth: 20
})
