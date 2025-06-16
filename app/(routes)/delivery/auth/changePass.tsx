import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import BgPattern from '@/assets/svg/Pattern'

const ChangePass = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmPassword, setShowConfirmPassword] = useState(true);

    const handleSubmit = () => {
        if (newPassword.length < 8) {
            Alert.alert("خطأ", "كلمة المرور يجب أن لا تقل عن ٨ خانات");
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert("خطأ", "كلمة المرور وتأكيدها غير متطابقين");
            return;
        }
        router.push("/(routes)/delivery/auth/success");
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={styles.safeContainer}>
                    <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                        <BgPattern />
                    </View>
                    {/* page title & back btn */}
                    <View style={styles.pageTitle}>
                        <TouchableOpacity onPress={() => router.back()}>
                            <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                        </TouchableOpacity>
                        <Text style={styles.pageTitleText}>تغيير كلمة المرور</Text>
                    </View>

                    <View style={{ width: '100%', marginBottom: scale(32), marginTop: scale(24) }}>
                        {/* header text */}
                        <Text style={styles.header}>تغيير كلمة المرور</Text>
                        <Text style={styles.subHeader}>
                            الرقم السري الجديد يجب ألا يكون مشابه للرمز القديم إطلاقًا
                        </Text>

                        {/* new password */}
                        <Text style={styles.inputHeader}>كلمة المرور الجديدة</Text>
                        <View style={styles.passwordContainer}>
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowNewPassword(!showNewPassword)}
                            >
                                <Icon name={showNewPassword ? "eye-off-outline" : "eye-outline"} color={'gray'} size={24} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.PassInput}
                                secureTextEntry={showNewPassword}
                                textContentType='password'
                                autoComplete='password'
                                textAlign='right'
                                placeholder='****************'
                                placeholderTextColor="#878787"
                                value={newPassword}
                                onChangeText={setNewPassword}
                            />
                        </View>
                        <Text style={styles.inputFooter}>يجب ألا يقل عن ٨ خانات</Text>

                        {/* confirm password */}
                        <Text style={styles.inputHeader}>تأكيد كلمة المرور</Text>
                        <View style={styles.passwordContainer}>
                            <TouchableOpacity
                                style={styles.eyeButton}
                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                <Icon name={showConfirmPassword ? "eye-off-outline" : "eye-outline"} color={'gray'} size={24} />
                            </TouchableOpacity>
                            <TextInput
                                style={styles.PassInput}
                                secureTextEntry={showConfirmPassword}
                                textContentType='password'
                                autoComplete='password'
                                textAlign='right'
                                placeholder='****************'
                                placeholderTextColor="#878787"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                            />
                        </View>
                        <Text style={styles.inputFooter}>كلا من الرقم السري يجب أن يتطابق</Text>
                    </View>

                    {/* submit */}
                    <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>تأكيد الرقم السري</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default ChangePass

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
        width: "100%", height: scale(40)
    },
    subHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(32),
        fontFamily: 'Almarai', textAlign: "right", width: "100%", color: "#878787",
        lineHeight: scale(20)
    },
    inputHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8),
        fontFamily: 'Almarai', textAlign: "right", width: "100%"
    },
    passwordContainer: {
        flexDirection: "row", width: '100%', justifyContent: "space-between",
        alignItems: "center", borderColor: '#878787', borderWidth: 1,
        borderRadius: scale(8), height: scale(48)
    },
    eyeButton: {
        width: scale(34), paddingLeft: scale(10)
    },
    PassInput: {
        width: '80%', height: scale(48), paddingHorizontal: scale(10),
        fontFamily: 'Almarai', fontSize: scale(12)
    },
    inputFooter: {
        fontSize: scale(12), fontWeight: 'normal', marginBottom: scale(8),
        fontFamily: 'Almarai', textAlign: "left", width: "100%", color: "#878787",
        lineHeight: scale(20)
    },
    submitButton: {
        width: '100%', height: scale(48), backgroundColor: "#036E65",
        justifyContent: "center", alignItems: "center", borderRadius: scale(100)
    },
    submitButtonText: {
        fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold',
        color: "#fff"
    }
})
