import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'

const CheckPhone = () => {
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleSendCode = () => {
        const saudiPhoneRegex = /^05\d{8}$/;

        if (!saudiPhoneRegex.test(phoneNumber)) {
            Alert.alert("رقم غير صحيح", "من فضلك أدخل رقم سعودي صحيح يبدأ بـ 05 مكون من 10 أرقام")
            return;
        }

        router.push("/(routes)/auth/verifyOTP")
    }

    return (
        <SafeAreaView style={styles.safeContainer}>

            {/* page title & back btn */}
            <View style={styles.pageTitle}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                    تحقق من رقم الهاتف
                </Text>
            </View>

            <View style={{ width: '100%', marginBottom: scale(32), marginTop: scale(24) }}>
                {/* header text & sub header */}
                <Text style={styles.header}>
                    هل نسيت
                    الرقم السري ؟
                </Text>
                <Text style={styles.subHeader}>
                    ادخل رقم هاتفك المسجل لدينا وسنقوم بارسال كود التحقق على الرقم المدخل
                </Text>

                {/* text input */}
                <Text style={styles.inputHeader}>
                    رقم الهاتف
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder='ادخل رقم هاتفك'
                    placeholderTextColor="#878787"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
            </View>

            {/* submit btn */}
            <TouchableOpacity
                onPress={handleSendCode}
                style={{
                    width: '100%',
                    height: scale(48),
                    backgroundColor: "#036E65",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: scale(100)
                }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff" }}>
                    ارسال رمز التحقق
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CheckPhone

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
    textInput: {
        width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), marginBottom: scale(14), textAlign: "right", fontFamily: 'Almarai', fontSize: scale(12),
    },
    inputHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: "right", width: "100%",
    },
})
