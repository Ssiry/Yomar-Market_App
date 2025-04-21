import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'

const verifyOTP = () => {

    function Loader() {
        return <Loader />
    }
    return (
        <SafeAreaView style={styles.safeContainer}>

            {/* page title & back btn */}
            <View style={styles.pageTitle}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                    رمز التحقق
                </Text>
            </View>

            {/* middel feild */}
            <View style={{ width: '100%', marginBottom: scale(32), marginTop: scale(24) }}>


                {/* header text & sub header */}
                <Text style={styles.header}>
                    التحقق من الحساب
                </Text>
                <Text style={styles.subHeader}>
                    ادخل رمز التحقق الذي تم ارسالة علي :
                    {'\n'}
                    +996 | 999 000 1122
                </Text>

                {/* text input  */}
                <View style={styles.textInputContainer}>

                    <TextInput style={styles.textInput} key={1} numberOfLines={1} maxLength={1} returnKeyType="next" />
                    <TextInput style={styles.textInput} key={2} numberOfLines={1} maxLength={1} returnKeyType="next" />
                    <TextInput style={styles.textInput} key={3} numberOfLines={1} maxLength={1} returnKeyType="next" />
                    <TextInput style={styles.textInput} key={4} numberOfLines={1} maxLength={1} returnKeyType="go" />

                </View>


                {/* send OTP again */}

                <TouchableOpacity>
                    <Text style={styles.sendAgain}>

                        <Text style={{ color: "#878787" }}>
                            لم يصلك رمز التحقق ؟
                        </Text>
                        {'  '}
                        اعآدة الارسال
                    </Text>
                </TouchableOpacity>

                {/* Timer */}
                <View style={{ width: "100%", height: scale(40), justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", marginTop: scale(24), gap: scale(8) }}>
                    <Icon name="timer-outline" size={scale(24)} color="#000" />
                    <Text style={{}}>
                        00:30
                    </Text>
                </View>



            </View>

            {/* submit btn */}
            <TouchableOpacity
                onPress={() => (router.push("/(routes)/auth/changePass"))}
                style={{
                    width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: "center", alignItems: "center", borderRadius: scale(100)
                }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff" }}>
                    استمرار
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default verifyOTP

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center', paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    pageTitle: {
        width: "100%", height: scale(40), justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row", marginTop: scale(24)
    },

    header: {
        fontSize: scale(24), fontWeight: 'bold', marginBottom: scale(8), marginTop: scale(14), fontFamily: 'Almarai', textAlign: "right", width: "100%", height: scale(40),
    },
    subHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(32), fontFamily: 'Almarai', textAlign: "right", width: "100%", color: "#878787", lineHeight: scale(20)
    },
    textInputContainer: {
        width: "100%", height: scale(48), display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: scale(14), paddingHorizontal: scale(20)
    },
    textInput: {
        width: scale(48), height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), marginBottom: scale(14), textAlign: "center", fontFamily: 'Almarai', fontSize: scale(24)
    },
    sendAgain: {
        fontFamily: 'Almarai', fontSize: scale(12), fontWeight: 'bold', color: "#036E65", textAlign: "center"
    }



})