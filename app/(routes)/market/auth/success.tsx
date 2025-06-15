import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Modal, Button } from 'react-native';

import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import SuccessIcon from "@/assets/svg/Success";
import Icon from 'react-native-vector-icons/FontAwesome6';
import { router } from 'expo-router';
import BgPattern from '@/assets/svg/Pattern';
// import Loader from '@/components/elements/loading';


const Success = () => {

    function Loader() {
        return
    }
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <SuccessIcon />

            {/* page title & back btn */}

            <View>


                <Text style={styles.title}>
                    تم التغيير بنجاح

                </Text>

                <Text style={{ fontSize: scale(16), fontFamily: "Almarai", fontWeight: "400", color: "#878787", lineHeight: scale(24), textAlign: "center", marginTop: scale(12) }}>
                    تم تغيير الرقم السري بنجاح ، الآن يمكنك تسجيل الدخول بالرقم السري الجديد

                </Text>
            </View>
            {/* submit btn */}
            <TouchableOpacity
                onPress={() => (router.push("/(routes)/market/home"))}
                style={{
                    width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: "center", alignItems: "center", borderRadius: scale(100)
                }}>
                <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: "#fff", lineHeight: scale(24) }}>
                    تسجيل الدخول
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Success

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "center", alignItems: 'center', paddingHorizontal: scale(24), gap: scale(32), backgroundColor: "#fff"
    },
    title: {
        fontSize: scale(24), fontFamily: "Almarai", fontWeight: "600", color: "#000", lineHeight: scale(40), textAlign: "center"
    },
    centeredView: {
        position: "absolute", justifyContent: "center", alignItems: "center",
    },
    modalView: {
        margin: scale(20),
        backgroundColor: "white",
        borderRadius: scale(10),
        padding: scale(35),
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: scale(2),
        },
        shadowOpacity: 0.25,
        shadowRadius: scale(4),
        elevation: 5,
    },
    modalText: {
        fontSize: scale(18),
        fontFamily: "Almarai",
        fontWeight: "500",
        color: "#000",
        textAlign: "center",
        marginBottom: scale(15),
    }
})