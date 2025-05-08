import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import DeliveryInfo from './DeliveryInfo'
import PayInfo from './PayInfo'
import OrderItems from './OrderItems'
import BgPattern from '@/assets/svg/Pattern'
import PopUP from '@/components/elements/popUpMsg'
import Share from '@/assets/svg/share'
import SuccessIcon from '@/assets/svg/Success'

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

                <View style={styles.pageTitle}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => router.back()}>
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitleText}>
                        تاكيد الطلب
                    </Text>
                    <View style={styles.dummyView} />
                </View>


                <Text style={{
                    fontSize: scale(14),
                    fontFamily: 'Almarai',
                    fontWeight: '300',
                    color: '#878787',
                    textAlign: 'center',
                    marginVertical: scale(10),
                }}>
                    انت تستحق خدمة رائعة
                </Text>

                <Text style={{
                    fontSize: scale(16),
                    fontFamily: 'Almarai',
                    fontWeight: '700',
                    color: '#046132',
                    textDecorationLine: 'underline',
                    marginVertical: scale(10),

                    textAlign: 'center',
                }}>
                    عناصر الطلب
                </Text>


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




                <TouchableOpacity
                    onPress={() => {
                        {
                            setVisible(true);

                        }
                    }}
                    style={styles.Button}
                >
                    <Text style={styles.ButtonText}>
                        تاكيد الطلب
                    </Text>
                </TouchableOpacity>
                {isVisible &&
                    <PopUP icon={'basket-check'} title={'تم اتمام الطلب بنجاح'} subtitle={'تم اتممام الطلب رقم #1099322 '} btnText={'الذهاب الي الصفحة الرئيسية'} onPress={function (): void {

                        setVisible(false);
                    }}
                    />
                }


            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center', paddingHorizontal: scale(24), backgroundColor: "#fff"
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