import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import DeliveryInfo from './DeliveryInfo'

import BgPattern from '@/assets/svg/Pattern'
import PayInfo from '@/app/(routes)/market/home/main/OrderStatus/PayInfo'
import OrderItems from '@/app/(routes)/market/home/main/OrderStatus/OrderItems'

const index = () => {
    const [isVisible, setVisible] = React.useState(false);
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
                <OrderItems />
                <PayInfo
                    orderPrice="123456"
                    deliveryFee={5}
                    totalPrice={10}
                // finalPrice={45}
                />

                <DeliveryInfo
                    customerName="محمد علي"
                    phoneNumber={1234567890}
                    city="الرياض"
                    address="شارع الملك فهد"
                    houseNumber="123"
                />



                <Text style={{
                    fontSize: scale(14),
                    fontFamily: 'Almarai',
                    fontWeight: '300',
                    color: '#046132',
                    textAlign: 'center',
                    marginVertical: scale(10),
                }}>
                    الملاحظات
                </Text>

                <View style={{ paddingHorizontal: scale(22), paddingVertical: scale(10), borderRadius: scale(8), backgroundColor: '#F5F5F5', marginBottom: scale(20) }}>

                    <Text style={{ textAlign: 'right', fontSize: scale(14), fontFamily: 'Almarai', fontWeight: '300', color: '#878787', lineHeight: scale(22) }}>
                        السلام عليكم يا صديقي الرجاء عدم رن جرس المنزل عن الوصول و فقط اكتفي برنة ساكون دائما متاح
                    </Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: {
        height: '100%',
        flex: 1, justifyContent: "flex-start", alignItems: 'center', paddingHorizontal: scale(4), backgroundColor: "#fff"
    },
    scrollView: {
        width: '100%', height: '100%', marginBottom: scale(-30)
    },
    Button: {
        width: '100%', height: scale(48), backgroundColor: "#036E65", justifyContent: 'center', alignItems: 'center', borderRadius: scale(100), marginTop: scale(0), marginBottom: scale(40),
    },
    ButtonText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#fff'
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
})