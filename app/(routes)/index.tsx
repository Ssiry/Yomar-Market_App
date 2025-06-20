import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
// import OnBoarding1 from '@/assets/svg/Onboarding1'
import DeliveryOrMarket from '@/assets/svg/DeliveryOrMarket'
import { router } from 'expo-router'
import CheckLoc from '@/app/(Utitilies)/checkLoc'
import CheckNet from '@/app/(Utitilies)/checkNet'

const index = () => {
    return (
        <SafeAreaView style={styles.container}>



            {/* <OnBoarding1 width={scale(342)} height={scale(228)} /> */}
            <DeliveryOrMarket />

            {/* make the status bar in the <View/> below */}
            <Text style={styles.header}>
                مرحبًا بك في
                "
                <Text style={{ fontWeight: '900', fontSize: scale(26), color: '#036E65' }}>يومار</Text>
                "
                {'\n'}
                <Text style={{ fontWeight: '900', fontSize: scale(18), color: '#036E65' }}>
                    للتاجر و المندوب
                </Text>
            </Text>


            <View style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: scale(10),
                marginTop: scale(20),
            }}>

                <TouchableOpacity style={[styles.Btn]}
                    onPress={() => {
                        router.push('/(routes)/market')
                    }}
                >
                    <Text style={[styles.BtnText]}>
                        الدخول كـ “تاجر”
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.Btn, { backgroundColor: '#fff' }]}
                    onPress={() => {
                        router.push('/(routes)/delivery')
                    }}
                >
                    <Text style={[styles.BtnText, { color: '#036E65' }]}>
                        الدخول كـ “مندوب”
                    </Text>
                </TouchableOpacity>

            </View>

            {/* 
            MARK:- permissions
             */}

            <CheckLoc />
            <CheckNet />


        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(20),
        // paddingVertical: scale(20),
    },
    header: {
        lineHeight: scale(30),
        fontFamily: 'Almarai', fontSize: scale(22), width: "100%", textAlign: "right", fontWeight: 'bold',
    },
    Btn: {
        backgroundColor: '#036E65',
        width: '100%',
        height: scale(50),
        borderRadius: scale(100),
        borderWidth: scale(2),
        borderColor: '#036E65',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: scale(20),
    },
    BtnText: {
        color: '#fff',
        fontSize: scale(16),
        fontWeight: 'regular',
        fontFamily: 'Almarai',
    },
})