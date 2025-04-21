import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'


const changePass = () => {
    const [showPassword, setShowPassword] = useState(true);


    return (
        <SafeAreaView style={styles.safeContainer}>

            {/* page title & back btn */}
            <View style={styles.pageTitle}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                    تغيير كلمة المرور

                </Text>
            </View>

            <View style={{ width: '100%', marginBottom: scale(32), marginTop: scale(24) }}>
                {/* header text & sub header */}
                <Text style={styles.header}>
                    تغيير كلمة المرور
                </Text>
                <Text style={styles.subHeader}>
                    الرقم السري الجديد يجب الا يكون مشابه الي الرمز القديم اطلاقاً

                </Text>

                {/* text input  */}

                <Text style={styles.inputHeader}>
                    كلمة المرور الجديدة

                </Text>

                <View style={{
                    flexDirection: "row", width: '100%', justifyContent: "space-between", alignItems: "center", borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), marginBottom: scale(0), height: scale(48),
                }}>

                    <TouchableOpacity
                        style={{ width: scale(34), paddingLeft: scale(10) }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {!showPassword ? (
                            <Icon name="eye-outline" color={'#000'} size={24} />
                        ) : (
                            <Icon name="eye-off-outline" color={'gray'} size={24} />
                        )}
                    </TouchableOpacity>

                    <TextInput style={styles.PassInput}
                        secureTextEntry={showPassword ? true : false}
                        textContentType='password'
                        autoComplete='password'
                        textAlign='right'
                        placeholder='****************'
                        placeholderTextColor="#878787"
                    />


                </View>
                <Text style={styles.inputFooter}>
                    يجب الا يقل عن ٨ خانات
                </Text>



                <Text style={styles.inputHeader}>
                    تاكيد كلمة المرور
                </Text>

                <View style={{
                    flexDirection: "row", width: '100%', justifyContent: "space-between", alignItems: "center", borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), marginBottom: scale(0), height: scale(48),
                }}>

                    <TouchableOpacity
                        style={{ width: scale(34), paddingLeft: scale(10) }}
                        onPress={() => setShowPassword(!showPassword)}
                    >
                        {!showPassword ? (
                            <Icon name="eye-outline" color={'#000'} size={24} />
                        ) : (
                            <Icon name="eye-off-outline" color={'gray'} size={24} />
                        )}
                    </TouchableOpacity>

                    <TextInput style={styles.PassInput}
                        secureTextEntry={showPassword ? true : false}
                        textContentType='password'
                        autoComplete='password'
                        textAlign='right'
                        placeholder='****************'
                        placeholderTextColor="#878787"
                    />

                </View>
                <Text style={styles.inputFooter}>
                    كلا من الرقم السري يجب ان يتطابق
                </Text>


            </View>

            <TouchableOpacity
                onPress={() => router.push("/(routes)/auth/success")}

                style={{
                    width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: "center", alignItems: "center", borderRadius: scale(100)
                }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff" }}>
                    تاكيد الرقم السري
                </Text>
            </TouchableOpacity>



        </SafeAreaView>
    )
}

export default changePass

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
    PassInput: {
        width: '80%', height: scale(48), borderRadius: scale(8), paddingHorizontal: scale(10), fontFamily: 'Almarai', fontSize: scale(12),
    },
    inputFooter: {
        fontSize: scale(12), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: "left", width: "100%", color: "#878787", lineHeight: scale(20)

    }

})