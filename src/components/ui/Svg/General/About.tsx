import React, { FC } from 'react'

import Svg, {ClipPath, Defs, G, Path, Rect} from 'react-native-svg'

import { SvgStyleProps } from 'components/ui/Svg/Svg.types'
import { createSvg } from 'utils/createSvg'

const Component: FC<SvgStyleProps> = (props) => (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
        <Rect x="0.5" width="24" height="24" rx="6" fill="#559EF8"/>
        <G clip-path="url(#clip0_2394_149723)">
            <Path d="M12.5 19.9648C16.8594 19.9648 20.4688 16.3476 20.4688 11.9961C20.4688 7.63672 16.8516 4.02734 12.4922 4.02734C8.14063 4.02734 4.53125 7.63672 4.53125 11.9961C4.53125 16.3476 8.14844 19.9648 12.5 19.9648ZM11.0938 16.5195C10.7578 16.5195 10.5 16.2773 10.5 15.9414C10.5 15.6289 10.7578 15.3711 11.0938 15.3711H12.0859V11.6992H11.2266C10.8984 11.6992 10.6406 11.457 10.6406 11.1211C10.6406 10.8086 10.8984 10.5508 11.2266 10.5508H12.7422C13.1562 10.5508 13.375 10.8477 13.375 11.2852V15.3711H14.3672C14.7032 15.3711 14.9609 15.6289 14.9609 15.9414C14.9609 16.2773 14.7032 16.5195 14.3672 16.5195H11.0938ZM12.4297 9.22265C11.8438 9.22265 11.375 8.7539 11.375 8.16015C11.375 7.5664 11.8438 7.09765 12.4297 7.09765C13.0156 7.09765 13.4766 7.5664 13.4766 8.16015C13.4766 8.7539 13.0156 9.22265 12.4297 9.22265Z" fill="white"/>
        </G>
        <Defs>
            <ClipPath id="clip0_2394_149723">
                <Rect width="15.9375" height="15.9453" fill="white" transform="translate(4.53125 4.02734)"/>
            </ClipPath>
        </Defs>
    </Svg>
)

export const SvgAbout = createSvg({
    component: Component,
    originalHeight: 24,
    originalWidth: 25
})
