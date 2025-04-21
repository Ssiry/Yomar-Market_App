
import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';
import { router } from "expo-router";



const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isAgree, setIsAgree] = useState(false);

    return (
        <SafeAreaView style={styles.safeContainer}>


            <Text style={styles.header}>
                انضم الينا الآن
            </Text>
            <Text style={styles.subHeader}>
                انشئ حساب الآن في
                <Text style={{ color: "#036E65", fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold' }}>
                    “يومار”
                </Text>
                و استمتع بافضل خدمة توصيل تستحقها
            </Text>

            <Text style={styles.inputHeader}>
                رقم الهاتف
            </Text>
            <TextInput
                style={styles.textInput}
                placeholder='
                ادخل رقم هاتفك
                '
                placeholderTextColor="#878787"
            />

            <Text style={styles.inputHeader}>
                كلمة المرور
            </Text>

            <View style={{
                flexDirection: "row", width: '100%', justifyContent: "space-between", alignItems: "center", borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), marginBottom: scale(14), height: scale(48),
            }}>

                <TouchableOpacity
                    style={{ width: scale(34), paddingLeft: scale(10) }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {!showPassword ? (
                        <Icon name="eye-outline" color={'gray'} size={24} />
                    ) : (
                        <Icon name="eye-off-outline" color={'gray'} size={24} />
                    )}
                </TouchableOpacity>

                <TextInput style={styles.PassInput}
                    secureTextEntry={true} textContentType='password' autoComplete='password'
                    textAlign='right'
                    placeholder='
                ادخل كلمة المرور    
                '
                    placeholderTextColor="#878787"
                />

            </View>
            <Text style={styles.inputHeader}>
                تاكيد كلمة المرور            </Text>
            <View style={{
                flexDirection: "row", width: '100%', justifyContent: "space-between", alignItems: "center", borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), marginBottom: scale(14), height: scale(48),
            }}>

                <TouchableOpacity
                    style={{ width: scale(34), paddingLeft: scale(10) }}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    {!showPassword ? (
                        <Icon name="eye-outline" color={'gray'} size={24} />
                    ) : (
                        <Icon name="eye-off-outline" color={'gray'} size={24} />
                    )}
                </TouchableOpacity>

                <TextInput style={styles.PassInput}
                    secureTextEntry={true} textContentType='password' autoComplete='password'
                    textAlign='right'
                    placeholder='
                ادخل كلمة المرور    
                '
                    placeholderTextColor="#878787"
                />

            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: scale(24), width: '100%' }}>

                <Text style={{ fontSize: scale(12), fontWeight: 'light', color: "#000", fontFamily: 'Almarai', textAlign: "right", width: "90%" }}>
                    انا موافق علي

                    <Text style={{ color: "#036E65", fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold' }}>
                        {' '}
                        الشروط و الاحكام
                    </Text>



                    <Text style={{ color: "#000", fontFamily: 'Almarai', fontSize: scale(12), fontWeight: 'light' }}>
                        {' '}
                        الخاصة بالتطبيق


                    </Text>

                </Text>
                <TouchableOpacity
                    style={{ width: scale(34), paddingRight: scale(10), marginLeft: scale(10) }}
                    onPress={() => setIsAgree(!isAgree)}
                >
                    {isAgree ? (
                        <Icon name="checkbox" color={'#036E65'} size={24} />
                    ) : (
                        <Icon name="checkbox-outline" color={'#000'} size={24} />
                    )}
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={{
                width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: "center", alignItems: "center", borderRadius: scale(100)
            }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff" }}>
                    انضم الان
                </Text>
            </TouchableOpacity>

            <View style={{
                flexDirection: "row", width: '100%', justifyContent: "center", alignItems: "center", marginTop: scale(24)
            }}>

                <View style={{ width: scale(50), height: 1, backgroundColor: "#878787", marginHorizontal: scale(8) }} />

                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), height: scale(20), color: "#878787" }}>
                    هل انت مستخدم بالفعل ؟
                </Text>

                <View style={{ width: scale(50), height: 1, backgroundColor: "#878787", marginHorizontal: scale(8) }} />

            </View>

            <TouchableOpacity
                onPress={() => {
                    // router.push("/(routes)/auth/login");
                    router.replace("/(routes)/auth/login");

                    // router.back();
                }}
                style={{
                    height: scale(33), backgroundColor: "#D9D9D9", justifyContent: "center", alignItems: "center", borderRadius: scale(100), marginTop: scale(16), paddingHorizontal: scale(24)
                }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'medium', color: "#036E65" }}>
                    تسجيل الدخول
                </Text>
            </TouchableOpacity>


        </SafeAreaView>
    )
}

export default Register

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center', padding: scale(24), backgroundColor: "#fff"
    },
    header: {
        fontSize: scale(32), fontWeight: 'bold', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: "right", width: "100%", height: scale(40)
    },
    subHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(32), fontFamily: 'Almarai', textAlign: "right", width: "100%", color: "#878787"
    },
    textInput: {
        width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), marginBottom: scale(14), textAlign: "right", fontFamily: 'Almarai', fontSize: scale(12),
    },
    PassInput: {
        width: '80%', height: scale(48), borderRadius: scale(8), paddingHorizontal: scale(10), fontFamily: 'Almarai', fontSize: scale(12),
    },
    inputHeader: {
        fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: "right", width: "100%",
    },
})