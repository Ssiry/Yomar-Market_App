import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import BgPattern from '@/assets/svg/Pattern'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'


const ChatSections = [
    {
        id: 1,
        img: require('@/assets/images/Image.png'),
        name: 'محمد امجد',
        msg: 'مرحبًا بك في الدردشة!',
        time: '10:00',
        unReadMsg: 2,
    },
    {
        id: 2,
        img: require('@/assets/images/product.png'),
        name: 'علي محمد',
        msg: 'مرحبًا بك في الدردشة!',
        time: '10:00',
        unReadMsg: 0,
    },
    {
        id: 3,
        img: require('@/assets/images/Image.png'),
        name: 'عماد محمد',
        msg: 'مرحبًا بك في الدردشة!',
        time: '10:00',
        unReadMsg: 0,
    },

]

const index = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.pageTitle}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.pageTitleText}>
                        المحادثات
                    </Text>

                    <View style={styles.dummyView} />


                    {/* <TouchableOpacity style={styles.iconButton} onPress={() => { }} >
                        <Icon name="call" size={scale(24)} color="#333" />
                    </TouchableOpacity> */}
                </View>

                {/* divider */}
                <View style={{ width: '100%', height: scale(1), backgroundColor: '#E5E5E5', marginVertical: scale(10) }} />

                {/* </View> */}
                {ChatSections.map((item) => (

                    <TouchableOpacity
                        onPress={() => router.push('/(routes)/chat/ChatPage')}
                        activeOpacity={0.7}
                        key={item.id}
                        style={{
                            width: '100%',
                            height: scale(75),
                            backgroundColor: '#C8DFDD',
                            borderRadius: scale(12),

                            paddingHorizontal: scale(10),

                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginBottom: scale(10),
                        }}>

                        <Image
                            source={item.img}
                            resizeMethod='resize'
                            resizeMode='cover'

                            style={{
                                backgroundColor: 'red', width: scale(50), height: scale(50), borderRadius: scale(100),
                                shadowColor: '#000',
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                shadowOpacity: 0.50,
                                shadowRadius: 3.0,

                                borderWidth: scale(3),
                                borderColor: '#036E65',
                                overflow: 'hidden',
                            }} />

                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                            , width: scale(175), height: scale(40)
                        }} >
                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                                {item.name}
                            </Text>
                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), color: '#333' }}>
                                {item.msg}
                            </Text>
                        </View>


                        <View style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                            , height: scale(40)
                        }} >

                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(14), color: '#333', textAlign: 'center' }}>
                                {item.unReadMsg > 0 ? <View>
                                    <Text
                                        style={{
                                            backgroundColor: '#036E65',
                                            borderRadius: scale(100),
                                            paddingVertical: scale(6),
                                            paddingHorizontal: scale(10),
                                            color: '#fff',
                                            fontFamily: 'Almarai',
                                            fontSize: scale(12),
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                        }}
                                    >{item.unReadMsg}</Text>
                                </View> : <Icon name="checkmark-done" size={scale(18)} color="#333" />}
                            </Text>



                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(12), color: '#333', fontWeight: 'bold', lineHeight: scale(20) }}>
                                {item.time}
                            </Text>

                        </View>

                    </TouchableOpacity>
                ))}


            </ScrollView>
        </SafeAreaView >
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    scrollView: { width: '100%', height: '100%', marginBottom: scale(-30) },

    iconButton: { backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', },

    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(10),
    },

    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        lineHeight: scale(20),
        fontWeight: 'bold'
    },

    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
})