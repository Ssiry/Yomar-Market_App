import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

interface HeaderProps {
    text: string;
    view: React.ReactNode;
    iconBtn: React.ReactNode;
    paddingV: number;
}

const Header = ({ text, view, paddingV, iconBtn }: HeaderProps) => {
    return (

        <View style={[styles.pageTitle, { paddingVertical: scale(paddingV) }]}>

            {iconBtn}

            <View style={{
                padding: scale(4),
                // height: scale(36),
                display: "flex",
                flexDirection: "row",
                justifyContent: 'center',
                gap: scale(6),
                alignItems: 'center',

            }}>

                <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65", fontSize: scale(12), fontWeight: "bold" }}>
                    {text}
                </Text>

                {view}
            </View>


        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    pageTitle: {
        width: "100%", justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: scale(10),
        borderTopWidth: scale(1), borderTopColor: "#E5E5E5",
        borderBottomWidth: scale(1), borderBottomColor: "#E5E5E5",
    },
    iconButton: {
        backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center',
    },
})