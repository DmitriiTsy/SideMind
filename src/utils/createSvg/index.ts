import { useMemo } from 'react'

import { deviceHeight, deviceWidth } from 'utils/dimentions'

import {
  CreateSvgProps,
  SvgProps,
  SvgStyleProps
} from 'components/ui/Svg/Svg.types'

export const createSvg = (props: CreateSvgProps) => {
  const { component, originalWidth, originalHeight } = props

  return (svgProps: SvgProps) => {
    const sizeProps: SvgStyleProps = useMemo(() => {
      const {
        size,
        sizeTarget = 'width',
        sizeUnit = 'px',
        style,
        color
      } = svgProps
      const aspectRatio = originalHeight / originalWidth
      const viewBox = `0 0 ${originalWidth} ${originalHeight}`
      if (!size) {
        return {
          ...svgProps,
          width: originalWidth,
          height: originalHeight,
          viewBox,
          style,
          color
        }
      }
      if (sizeTarget == 'width') {
        const width = sizeUnit === 'px' ? size : (deviceWidth * size) / 100
        const height =
          sizeUnit === 'px' ? size * aspectRatio : width * aspectRatio
        return { ...svgProps, width, height, viewBox, style, color }
      } else {
        const height = sizeUnit === 'px' ? size : (deviceHeight * size) / 100
        const width =
          sizeUnit === 'px' ? size * aspectRatio : height * aspectRatio
        return { ...svgProps, width, height, viewBox, style, color }
      }
    }, [svgProps])

    return component(sizeProps)
  }
}
