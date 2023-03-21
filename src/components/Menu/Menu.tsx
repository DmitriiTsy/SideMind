import React from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";

import {Svg} from "components/ui/Svg";
import {ScreenContainer} from "components/ScreenContainer";
import {INavigationService, INavigationServiceTid} from "services";
import {useInject} from "IoC";

interface menuItem {
    icon: string,
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
                {socialMediaItems.map((item, index) => (
                    <View style={SS.menuItem}>
                        <View style={{width: '10%'}}>
                            <Svg name={item.icon} />
                        </View>
                        <View style={[SS.menuItemInfo, {
                            marginBottom: index !== socialMediaItems.length - 1 ? 10 : 0,
                            paddingBottom: index !== socialMediaItems.length - 1 ? 10 : 0,
                            borderBottomWidth: index !== socialMediaItems.length - 1 ? 0.5 : 0,
                        }]}>
                            <Text style={SS.itemText}>{item.text}</Text>
                            <Svg style={{marginRight: 18}} name={'PointerRight'} />
                        </View>
                    </View>
                ))}
            </View>

            <View style={SS.container}>
                {menuItems.map((item, index) => (
                    <View style={SS.menuItem}>
                        <View style={{width: '10%'}}>
                            <Svg name={item.icon} />
                        </View>
                        <View style={[SS.menuItemInfo, {
                            marginBottom: index !== menuItems.length - 1 ? 10 : 0,
                            paddingBottom: index !== menuItems.length - 1 ? 10 : 0,
                            borderBottomWidth: index !== menuItems.length - 1 ? 0.5 : 0,
                        }]}>
                            <Text style={SS.itemText}>{item.text}</Text>
                            <Svg style={{marginRight: 18}} name={'PointerRight'} />
                        </View>
                    </View>
                ))}
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
    },
    menuItem: {
        flexDirection: 'row',
        paddingLeft: 18,
    },
    menuItemInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: '90%',
        borderBottomColor: '#444444'
    },
    itemText: {
        fontSize: 15,
        color: '#FFFFFF',
        letterSpacing: 0.5,
        lineHeight: 21,
    }
})