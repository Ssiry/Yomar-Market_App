import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import Header from './Header'
import PayMachine from '@/assets/svg/PayMachine'
import Note from '@/assets/svg/Note'
import LocationPin from '@/assets/svg/LocationPin'
import OrderItems from './OrderItems'
import OrderDetails from './orderDetails'
import BgPattern from '@/assets/svg/Pattern'



const OrderProccess = () => {
    const [needPayMachine, setNeedPayMachine] = useState(false)


    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                    <BgPattern />
                </View>


                <View style={styles.pageTitle}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.back()}>
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitleText}>
                        السلة
                    </Text>
                    <View style={styles.dummyView} />
                </View>

                <Header
                    text=' السعودية ، جدة ، شارع بن سبعيني '
                    view={<LocationPin />}
                    paddingV={0}
                    iconBtn={
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: 'transparent' }]}
                            onPress={() => { }}>
                            <Icon name={'filter-circle'} size={scale(28)} color="#036E65" />
                        </TouchableOpacity>
                    }
                />


                <OrderItems />



                <Header
                    text=' هل تريد من الكابتن توفير شبكة '
                    view={<PayMachine />}
                    paddingV={10}

                    iconBtn=
                    {
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: 'transparent' }]}
                            onPress={() => setNeedPayMachine(!needPayMachine)}>
                            {
                                needPayMachine ?
                                    <Icon name={'checkmark-circle'} size={scale(28)} color="#036E65" />
                                    :
                                    <Icon name={'checkmark-circle-outline'} size={scale(28)} color="#036E65" />
                            }
                        </TouchableOpacity>
                    }
                />

                <Header
                    text=' اضف ملاحظة علي الطلب  '
                    view={<Note />}
                    paddingV={10}

                    iconBtn=
                    {

                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: 'transparent' }]}
                            onPress={() => { }}>

                            <Icon name={'add-circle-outline'} size={scale(28)} color="#036E65" />
                        </TouchableOpacity>
                    }
                />

                {/* MARK:- order Details */}
                <OrderDetails />

                <TouchableOpacity
                    onPress={() => {
                        router.push('/(routes)/OrderProccess/ConfirmOrder')
                    }}
                    style={styles.Button}
                >
                    <Text style={styles.ButtonText}>
                        مراجعة الطلب
                    </Text>
                </TouchableOpacity>



            </ScrollView>
        </SafeAreaView>
    )
}

export default OrderProccess

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center', paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    scrollView: {
        width: '100%', height: '100%', marginBottom: scale(-30)
    },
    pageTitle: {
        width: "100%", height: scale(40), justifyContent: "space-between", alignItems: "center", flexDirection: "row", marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold'
    },
    iconButton: {
        backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center',
    },
    dummyView: {
        width: scale(36), height: scale(36), backgroundColor: '#fff', borderRadius: scale(8)
    },


    // card styles
    Button: {
        width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: 'center', alignItems: 'center', borderRadius: scale(100), marginTop: scale(0), marginBottom: scale(40),
    },
    ButtonText: {
        fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: '#fff'
    },
})