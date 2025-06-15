import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BgPattern from '@/assets/svg/Pattern';

const Login = () => {
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passError, setPassError] = useState('');

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

    const handlePasswordChange = (text: any) => {
        if (text.length < 8 && text.length !== 0) {
            setPassError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        } else {
            setPassError('');
        }
        setPassword(text);
    };

    const handleSubmit = () => {
        if (phone.length === 10 && password.length >= 8) {

            generateOTP();
            router.push('/(routes)/market/auth/verifyOTP');
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
        AsyncStorage.setItem('otpFor', 'verifyLogin')
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
            <Text style={styles.header}>تسجيل الدخول الي حسابك</Text>
            <Text style={styles.subHeader}>من فضلك ادخل بياناتك لتسجيل الدخول</Text>

            <Text style={[styles.inputHeader, { marginTop: scale(24) }]}>رقم الجوال</Text>
            <TextInput
                style={styles.textInput}
                value={phone}
                onChangeText={handlePhoneChange}
                keyboardType="numeric"
                maxLength={10}
                placeholder="05XXXXXXXX"
                placeholderTextColor="#878787"
            />
            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <Text style={[styles.inputHeader, error === '' ? { marginTop: scale(24) } : { marginTop: scale(4) }]}>كلمة المرور</Text>
            <View style={styles.passwordContainer}>
                <TouchableOpacity
                    style={{ width: scale(34), paddingLeft: scale(10) }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon name={showPassword ? "eye-off-outline" : "eye-outline"} color={'gray'} size={24} />
                </TouchableOpacity>

                <TextInput
                    style={styles.PassInput}
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    textContentType="password"
                    autoComplete="password"
                    textAlign="right"
                    placeholder="ادخل كلمة المرور"
                    placeholderTextColor="#878787"
                />
            </View>
            {passError ? <Text style={styles.errorPassMessage}>{passError}</Text> : null}

            <TouchableOpacity
                onPress={() => { router.push('/(routes)/market/auth/checkPhone') }}
                style={{ width: "100%", marginTop: scale(10) }}>
                <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={handleSubmit}
                style={styles.loginButton}
            >
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
            </TouchableOpacity>

            <View style={styles.separatorContainer}>
                <View style={styles.separatorLine} />
                <Text style={styles.separatorText}>هل انت مستخدم جديد؟</Text>
                <View style={styles.separatorLine} />
            </View>

            <TouchableOpacity
                onPress={() => router.push("/(routes)/market/auth/register")}
                style={styles.registerButton}
            >
                <Text style={styles.registerButtonText}>انضم الينا الآن</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Login;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: scale(24),
        backgroundColor: '#fff',
    },
    header: {
        fontSize: scale(32),
        fontWeight: 'bold',
        marginBottom: scale(8),
        fontFamily: 'Almarai',
        textAlign: 'right',
        width: '100%',
    },
    subHeader: {
        fontSize: scale(14),
        fontWeight: 'normal',
        marginBottom: scale(14),
        fontFamily: 'Almarai',
        textAlign: 'right',
        width: '100%',
        color: '#878787',
    },

    textInput: {
        width: '100%',
        height: scale(48),
        borderColor: '#878787',
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        textAlign: 'right',
        fontFamily: 'Almarai',
        fontSize: scale(12),
    },

    PassInput: {
        width: '80%',
        height: scale(48),
        paddingHorizontal: scale(10),
        fontFamily: 'Almarai',
        fontSize: scale(12),
    },
    passwordContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: '#878787',
        borderWidth: 1,
        borderRadius: scale(8),
        height: scale(48),
    },
    inputHeader: {
        fontSize: scale(14),
        fontWeight: 'normal',
        marginBottom: scale(8),
        fontFamily: 'Almarai',
        textAlign: 'right',
        width: '100%',
    },
    errorMessage: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        color: 'red',
        textAlign: 'left',
        width: '100%',
        marginTop: scale(4),
        // marginBottom: scale(10),
        lineHeight: scale(20),
    },
    errorPassMessage: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        color: 'red',
        textAlign: 'left',
        width: '100%',
        marginTop: scale(4),
        // marginBottom: scale(10),
        lineHeight: scale(20),
    },
    forgotPasswordText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        marginTop: scale(15),
        color: "#036E65",
        textAlign: 'left',
        width: '100%',
    },
    loginButton: {
        width: '100%',
        height: scale(48),
        backgroundColor: "#036E65",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(100),
        marginTop: scale(16),
    },
    loginButtonText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#fff'
    },
    separatorContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(24),
    },
    separatorLine: {
        width: scale(50),
        height: 1,
        backgroundColor: "#878787",
        marginHorizontal: scale(8)
    },
    separatorText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        height: scale(20),
        color: "#878787"
    },
    registerButton: {
        height: scale(33),
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: scale(100),
        marginTop: scale(16),
        paddingHorizontal: scale(24),
    },
    registerButtonText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: '500',
        color: "#036E65"
    }
});