import { StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'

const VerifyOTP = () => {
    const inputRefs = useRef<(TextInput | null)[]>([]);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [loading, setLoading] = useState(false);

    // Timer
    useEffect(() => {
        if (timeLeft <= 0) return;
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
    }, [timeLeft]);

    // Handle OTP input
    const handleChange = (text: string, index: number) => {
        if (text.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);

        if (text !== "" && index < inputRefs.current.length - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerify = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            router.push("/(routes)/auth/changePass");
        }, 1500);
    };

    const handleResend = () => {
        setTimeLeft(30);
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
    };

    return (
        <SafeAreaView style={styles.safeContainer}>

            {/* page title & back btn */}
            <View style={styles.pageTitle}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={styles.pageTitleText}>رمز التحقق</Text>
            </View>

            <View style={{ width: '100%', marginBottom: scale(32), marginTop: scale(24) }}>
                {/* header */}
                <Text style={styles.header}>التحقق من الحساب</Text>
                <Text style={styles.subHeader}>
                    ادخل رمز التحقق الذي تم ارساله علي: {'\n'}
                    +996 | 999 000 1122
                </Text>

                {/* text input */}
                <View style={styles.textInputContainer}>
                    {[0, 1, 2, 3].map((_, index) => (
                        <TextInput
                            key={index}
                            ref={(ref: TextInput | null) => (inputRefs.current[index] = ref)}
                            style={styles.textInput}
                            value={otp[index]}
                            onChangeText={(text) => handleChange(text, index)}
                            keyboardType="numeric"
                            maxLength={1}
                            returnKeyType={index === 3 ? "go" : "next"}
                            onSubmitEditing={handleVerify}
                        />
                    ))}
                </View>

                {/* send again */}
                <TouchableOpacity onPress={handleResend} disabled={timeLeft > 0}>
                    <Text style={[styles.sendAgain, { color: timeLeft > 0 ? "#878787" : "#036E65" }]}>
                        لم يصلك رمز التحقق ؟ {'  '}
                        <Text>إعادة الارسال</Text>
                    </Text>
                </TouchableOpacity>

                {/* Timer */}
                <View style={styles.timer}>
                    <Icon name="timer-outline" size={scale(24)} color="#000" />
                    <Text>{`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}</Text>
                </View>
            </View>

            {/* submit button */}
            <TouchableOpacity
                onPress={handleVerify}
                style={styles.submitButton}
                disabled={otp.some(v => v === "") || loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.submitButtonText}>استمرار</Text>
                )}
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default VerifyOTP

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center',
        paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    pageTitle: {
        width: "100%", height: scale(40), justifyContent: "space-between",
        alignItems: "center", flexDirection: "row", marginTop: scale(24)
    },
    pageTitleText: {
        fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold'
    },
    header: {
        fontSize: scale(24), fontWeight: 'bold', marginBottom: scale(8),
        marginTop: scale(14), fontFamily: 'Almarai', textAlign: "right",
        width: "100%", height: scale(40),
    },
    subHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(32),
        fontFamily: 'Almarai', textAlign: "right", width: "100%", color: "#878787",
        lineHeight: scale(20)
    },
    textInputContainer: {
        width: "100%", height: scale(48), flexDirection: "row",
        justifyContent: "space-between", alignItems: "center",
        marginBottom: scale(14), paddingHorizontal: scale(20)
    },
    textInput: {
        width: scale(48), height: scale(48), borderColor: '#878787', borderWidth: 1,
        borderRadius: scale(8), paddingHorizontal: scale(10), textAlign: "center",
        fontFamily: 'Almarai', fontSize: scale(24)
    },
    sendAgain: {
        fontFamily: 'Almarai', fontSize: scale(12), fontWeight: 'bold',
        textAlign: "center"
    },
    timer: {
        width: "100%", height: scale(40), justifyContent: "center",
        alignItems: "center", flexDirection: "row", marginTop: scale(24),
        gap: scale(8)
    },
    submitButton: {
        width: '100%', height: scale(48), backgroundColor: "#036E65",
        justifyContent: "center", alignItems: "center", borderRadius: scale(100)
    },
    submitButtonText: {
        fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff"
    }
});
