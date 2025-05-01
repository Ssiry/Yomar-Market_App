import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BgPattern from '@/assets/svg/Pattern'

const CheckPhone = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const handlePhoneChange = (text: string) => {
        let filtered = text.replace(/[^0-9]/g, '');

        if (filtered.length === 1 && filtered !== '0') {
            filtered = '';
        } else if (filtered.length === 2 && filtered !== '05') {
            filtered = '0';
        }

        if (filtered.length > 10) {
            filtered = filtered.slice(0, 10);
        }

        setPhone(filtered);

        if (filtered.length < 10 && filtered.length > 0) {
            setError('رقم الهاتف غير مكتمل');
        } else {
            setError('');
        }
    };


    const handleSubmit = () => {
        if (phone.length === 10) {
            //generate OTP

            generateOTP();

            // Perform the API call to send the OTP
            router.push('/(routes)/auth/verifyOTP');
        } else {
            alert('يرجى إدخال رقم الهاتف وكلمة المرور بشكل صحيح');
        }
    };

    const generateOTP = () => {
        // Generate a random 4-digit OTP
        // You can customize the length of the OTP as needed
        // For a 4-digit OTP:

        const otp = Math.floor(1000 + Math.random() * 9000);
        console.log('Generated OTP:', otp);
        AsyncStorage.setItem('otp', otp.toString())
        AsyncStorage.setItem('otpFor', 'changePassword')
            .then(() => {
                console.log('OTP saved to AsyncStorage:', otp);

            })
            .catch((error) => {
                console.error('Error saving OTP to AsyncStorage:', error);
                return;

            });

    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
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
                    value={phone}
                    onChangeText={handlePhoneChange}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
                {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            </View>

            {/* submit btn */}
            <TouchableOpacity
                onPress={handleSubmit}
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
        width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), marginBottom: scale(10), textAlign: "right", fontFamily: 'Almarai', fontSize: scale(12),
    },
    inputHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: "right", width: "100%",
    }, errorMessage: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        color: 'red',
        textAlign: 'left',
        width: '100%',
        marginTop: scale(4),
        // marginBottom: scale(10),
        lineHeight: scale(20),
        marginBottom: scale(14),
    },
})
