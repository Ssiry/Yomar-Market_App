import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import RS from '@/assets/svg/RS'

const OrderDetails = () => {
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
            backgroundColor: 'transparent',
            borderWidth: scale(1),
            borderColor: '#EDEDED',
            // F5F5F5
            marginVertical: scale(10),
            // marginBottom: scale(50),

        }}>
            <Text style={{
                fontSize: scale(14),
                fontFamily: 'Almarai',
                fontWeight: '700',
                color: '#333',
                textAlign: 'right',
            }}>
                تفاصيل الطلب
            </Text>
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    {/* <RS /> */}
                    <Text style={[styles.MarketDescription, { color: "#333" }]}>#0132323</Text>
                </View>
                <Text style={styles.MarketName}>
                    الطلب ID
                </Text>
            </View>

            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <RS color='#333' />
                    <Text style={[styles.MarketDescription, { color: "#333" }]}>٤٨.٥</Text>
                </View>
                <Text style={styles.MarketName}>
                    اجمالي العناصر
                </Text>
            </View>
            {/* رسوم التوصيل */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    {/* <RS /> */}
                    <Text style={[styles.MarketDescription, { color: "#333" }]}>مجاناً </Text>
                </View>
                <Text style={styles.MarketName}>
                    رسوم التوصيل
                </Text>
            </View>
            {/* الخصم */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <RS color='#333' />
                    <Text style={[styles.MarketDescription, { color: "#333" }]}>٤.٥ </Text>
                </View>
                <Text style={styles.MarketName}>
                    الخصم
                </Text>
            </View>
            {/* السعر النهائي */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <RS color='#333' />
                    <Text style={[styles.MarketDescription, { color: "#333" }]}>٤٤.٥</Text>
                </View>
                <Text style={styles.MarketName}>
                    السعر النهائي
                </Text>
            </View>

        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
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
        color: '#036E65',
        textAlign: 'right',
        // width: '100%',
    },
    MarketDescription: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '700',
        color: '#036E65',
        textAlign: 'right',

    },
})