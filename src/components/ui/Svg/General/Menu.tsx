import React, { FC } from 'react'

import Svg, { Path } from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M4 20.4102C3.44772 20.4102 3 19.9624 3 19.4102V19.4102C3 18.8579 3.44772 18.4102 4 18.4102H20C20.5523 18.4102 21 18.8579 21 19.4102V19.4102C21 19.9624 20.5523 20.4102 20 20.4102H4Z" fill="white"/>
        <Path d="M4 13.4102C3.44772 13.4102 3 12.9624 3 12.4102V12.4102C3 11.8579 3.44772 11.4102 4 11.4102H20C20.5523 11.4102 21 11.8579 21 12.4102V12.4102C21 12.9624 20.5523 13.4102 20 13.4102H4Z" fill="white"/>
        <Path d="M4 6.41016C3.44772 6.41016 3 5.96244 3 5.41016V5.41016C3 4.85787 3.44772 4.41016 4 4.41016H20C20.5523 4.41016 21 4.85787 21 5.41016V5.41016C21 5.96244 20.5523 6.41016 20 6.41016H4Z" fill="white"/>
    </Svg>
)

export const SvgMenu = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 24
})
