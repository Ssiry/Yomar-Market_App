import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import RS from '@/assets/svg/RS'

interface InfoSectionProps {
    orderPrice: string;
    deliveryFee: number;
    totalPrice: number;
}

const PayInfo = ({ orderPrice, deliveryFee, totalPrice }: InfoSectionProps) => {


    return (

        <View style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: scale(12),
            paddingVertical: scale(20),
            gap: scale(15),

            borderRadius: scale(8),
            borderBottomWidth: scale(3),
            borderBottomColor: '#F5F5F5', marginVertical: scale(10),
        }}>
            {/* عنوان القسم */}


            <Text style={{
                fontSize: scale(16),
                fontFamily: 'Almarai',
                fontWeight: '800',
                color: '#046132',
                textDecorationLine: 'underline',
                textAlign: 'right',
            }}>
                الحسابات
            </Text>


            {/* سعر الطلب*/}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>#{orderPrice}</Text>
                </View>
                <Text style={styles.MarketName}>
                    سعر الطلب
                </Text>
            </View>

            {/* رسوم التوصيل */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <RS color='#046132' />
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>
                        {deliveryFee === 0 ? 'مجاناً' : deliveryFee}
                    </Text>
                </View>
                <Text style={styles.MarketName}>
                    رسوم التوصيل
                </Text>
            </View>


            {/* الخصم */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <RS color='#046132' />
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>{totalPrice}</Text>
                </View>
                <Text style={styles.MarketName}>
                    المبلغ الاجمالي
                </Text>
            </View>

            <Text style={[styles.iconButton, {
                fontSize: scale(14),
                fontFamily: 'Almarai',
                fontWeight: '500',
                color: '#333',
                textAlign: 'center',
            }]}>
                الدفع عند الاستلام
            </Text>


        </View>
    )
}

export default PayInfo

const styles = StyleSheet.create({
    iconButton: {
        backgroundColor: '#E5E5E5', borderRadius: scale(8), paddingVertical: scale(8),
        paddingHorizontal: scale(22),
        //  width: scale(36), height: scale(36), 
        justifyContent: 'center', alignItems: 'center',
    },
    priceRow: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(2),
    },
    MarketName: {
        fontSize: scale(12),
        fontWeight: '700',
        fontFamily: 'Almarai',
        color: '#878787',
        textAlign: 'right',
        lineHeight: scale(14),
        // width: '100%',
    },
    MarketDescription: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '700',
        color: '#046132',
        textAlign: 'right',

    },
})