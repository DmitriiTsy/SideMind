import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

import { Svg } from "components/ui/Svg";
import { ScreenContainer } from "components/ScreenContainer";
import { INavigationService, INavigationServiceTid } from "services";
import { useInject } from "IoC";
import { MenuItem } from "components/Menu/components";
import { SVG_MAP } from "components/ui/Svg/constants";

interface menuItem {
    icon: keyof typeof SVG_MAP,
    text: string
}
export const Menu = () => {
    const navigation = useInject<INavigationService>(INavigationServiceTid)

    const socialMediaItems: menuItem[] = [
        {icon: 'Discord', text: 'Join our Discord'},
        {icon: 'Twitter', text: 'Follow Us on Twitter'}
    ]

    const menuItems: menuItem[] = [
        {icon: 'Share', text: 'Share with Friends'},
        {icon: 'Rate', text: 'Rate Us'},
        {icon: 'Feedback', text: 'Send Feedback'},
        {icon: 'About', text: 'About SideMind'},
        {icon: 'TermsAndConditions', text: 'Terms and conditions'},
        {icon: 'PrivacyPolicy', text: 'Privacy policy'},
    ]
    const header = () => {
        return (
            <View style={SS.headerContainer}>
                <Pressable style={{position: 'absolute', left: 10}} onPress={() => navigation.goBack()}>
                    <Svg name={'PointerLeft'} />
                </Pressable>
                <Text style={SS.title}>Menu</Text>
            </View>
        )
    }

    return (
        <ScreenContainer
            topInsetColor={'#000000'}
            bottomInsetColor={'#000000'}
            style={SS.screenContainer}
        >
            {header()}
            <View style={SS.container}>
                {socialMediaItems.map((item, index) =>
                  <MenuItem
                    key={index}
                    item={item}
                    index={index}
                    arrayLength={socialMediaItems.length}
                  />
                )}
            </View>
            <View style={SS.container}>
                {menuItems.map((item, index) =>
                  <MenuItem
                    key={index}
                    item={item}
                    index={index}
                    arrayLength={menuItems.length}
                  />
                )}
            </View>
        </ScreenContainer>
    )
};

const SS = StyleSheet.create({
    screenContainer: {
        backgroundColor: '#000000',
        alignItems: 'center'
    },
    title: {
        fontWeight: '600',
        fontSize: 20,
        lineHeight: 28,
        letterSpacing: 0.15,
        color: '#FFFFFF',
    },
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        position: 'relative'
    },
    container: {
        backgroundColor: '#1C1C1E',
        borderRadius: 12,
        marginTop: 34,
        paddingVertical: 10
    }
})