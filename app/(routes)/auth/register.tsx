import { StyleSheet, Text, TextInput, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import BgPattern from '@/assets/svg/Pattern';

const Register = () => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [error, setError] = useState('');



    const handlePhoneChange = (text: string) => {
        let filtered = text.replace(/[^0-9]/g, ''); // Allow only numbers

        if (filtered.length === 1 && filtered !== '0') {
            filtered = '';
        } else if (filtered.length === 2 && filtered !== '05') {
            filtered = '0';
        }

        if (filtered.length > 10) {
            filtered = filtered.slice(0, 10);
        }

        setPhone(filtered);

        // Validation check for phone number
        if (filtered.length < 10 && filtered.length > 0) {
            setError('رقم الهاتف غير مكتمل');
        } else if (filtered.length === 0) {
            setError('');
        } else {
            setError('');
        }
    };

    const handleRegister = () => {
        if (!phone || !password || !confirmPassword) {
            Alert.alert("تنبيه", "برجاء ملء جميع البيانات");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("تنبيه", "كلمتا المرور غير متطابقتين");
            return;
        }

        if (!isAgree) {
            Alert.alert("تنبيه", "يجب الموافقة على الشروط والأحكام");
            return;
        }

        // هنا تقدر تضيف منطق التسجيل الفعلي
        // Alert.alert("تم التسجيل", "مرحبا بك في يومار!");
        handleSubmit();
        router.push("/(routes)/home");
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
        AsyncStorage.setItem('otpFor', 'verifyRegister')
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
            <Text style={styles.header}>انضم الينا الآن</Text>

            <Text style={styles.subHeader}>
                انشئ حساب الآن في
                <Text style={styles.brandText}> “يومار” </Text>
                و استمتع بافضل خدمة توصيل تستحقها
            </Text>

            {/* رقم الهاتف */}
            <Text style={styles.inputHeader}>رقم الهاتف</Text>
            <TextInput
                style={styles.textInput}
                placeholder='ادخل رقم هاتفك'
                placeholderTextColor="#878787"

                keyboardType="phone-pad"
                textAlign="right"
                value={phone}
                onChangeText={handlePhoneChange}
            />

            {/* كلمة المرور */}
            <Text style={styles.inputHeader}>كلمة المرور</Text>
            <View style={styles.passwordContainer}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        color={'gray'}
                        size={24}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.PassInput}
                    secureTextEntry={!showPassword}
                    textContentType='password'
                    autoComplete='password'
                    textAlign='right'
                    placeholder='ادخل كلمة المرور'
                    placeholderTextColor="#878787"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* تأكيد كلمة المرور */}
            <Text style={styles.inputHeader}>تأكيد كلمة المرور</Text>
            <View style={styles.passwordContainer}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Icon
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        color={'gray'}
                        size={24}
                    />
                </TouchableOpacity>
                <TextInput
                    style={styles.PassInput}
                    secureTextEntry={!showPassword}
                    textContentType='password'
                    autoComplete='password'
                    textAlign='right'
                    placeholder='ادخل كلمة المرور'
                    placeholderTextColor="#878787"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />
            </View>

            {/* الشروط */}
            <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                    انا موافق علي
                    <Text style={styles.termsLink}> الشروط و الاحكام </Text>
                    <Text>الخاصة بالتطبيق</Text>
                </Text>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => setIsAgree(!isAgree)}
                >
                    <Icon
                        name={isAgree ? "checkbox" : "checkbox-outline"}
                        color={isAgree ? '#036E65' : '#000'}
                        size={24}
                    />
                </TouchableOpacity>
            </View>

            {/* زر التسجيل */}
            <TouchableOpacity
                onPress={handleRegister}
                disabled={!phone || !password || !confirmPassword || !isAgree}
                style={[
                    styles.registerButton,
                    { backgroundColor: (!phone || !password || !confirmPassword || !isAgree) ? '#ccc' : '#036E65' }
                ]}
            >
                <Text style={styles.registerButtonText}>انضم الان</Text>
            </TouchableOpacity>

            {/* تسجيل الدخول */}
            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>هل انت مستخدم بالفعل ؟</Text>
                <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity
                onPress={() => router.replace("/(routes)/auth/login")}
                style={styles.loginButton}
            >
                <Text style={styles.loginButtonText}>تسجيل الدخول</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Register

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center',
        padding: scale(24), backgroundColor: "#fff"
    },
    header: {
        fontSize: scale(32), fontWeight: 'bold', marginBottom: scale(8),
        fontFamily: 'Almarai', textAlign: "right", width: "100%"
    },
    subHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(32),
        fontFamily: 'Almarai', textAlign: "right", width: "100%", color: "#878787"
    },
    brandText: {
        color: "#036E65", fontWeight: 'bold'
    },
    textInput: {
        width: '100%', height: scale(48), borderColor: '#878787',
        borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10),
        marginBottom: scale(14), textAlign: "right", fontFamily: 'Almarai'
    },
    inputHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8),
        fontFamily: 'Almarai', textAlign: "right", width: "100%"
    },
    passwordContainer: {
        flexDirection: "row", width: '100%', alignItems: "center",
        borderColor: '#878787', borderWidth: 1, borderRadius: scale(8),
        marginBottom: scale(14), height: scale(48)
    },
    PassInput: {
        width: '80%', height: scale(48), paddingHorizontal: scale(0),
        fontFamily: 'Almarai'
    },
    iconButton: {
        width: scale(34), paddingLeft: scale(10)
    },
    termsContainer: {
        flexDirection: "row", justifyContent: "space-between", alignItems: "center",
        marginBottom: scale(24), width: '100%'
    },
    termsText: {
        fontSize: scale(12), fontWeight: 'light', color: "#000",
        fontFamily: 'Almarai', textAlign: "right", width: "90%"
    },
    termsLink: {
        color: "#036E65", fontWeight: 'bold'
    },
    registerButton: {
        width: '100%', height: scale(48), justifyContent: "center",
        alignItems: "center", borderRadius: scale(100)
    },
    registerButtonText: {
        fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff"
    },
    dividerContainer: {
        flexDirection: "row", width: '100%', justifyContent: "center",
        alignItems: "center", marginTop: scale(24)
    },
    dividerLine: {
        width: scale(50), height: 1, backgroundColor: "#878787", marginHorizontal: scale(8)
    },
    dividerText: {
        fontFamily: 'Almarai', fontSize: scale(14), height: scale(20), color: "#878787"
    },
    loginButton: {
        height: scale(33), backgroundColor: "#D9D9D9", justifyContent: "center",
        alignItems: "center", borderRadius: scale(100), marginTop: scale(16),
        paddingHorizontal: scale(24)
    },
    loginButtonText: {
        fontFamily: 'Almarai', fontSize: scale(14), fontWeight: '800',
        color: "#036E65"
    }
});
