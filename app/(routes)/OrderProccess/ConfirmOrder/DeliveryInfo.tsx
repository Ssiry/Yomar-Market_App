import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import RS from '@/assets/svg/RS'

interface InfoSectionProps {
    customerName: string;
    phoneNumber: number;
    city: string;
    address: string;
    houseNumber: string;
}

const DeliveryInfo = ({ customerName, phoneNumber, city, address, houseNumber }: InfoSectionProps) => {


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
            // backgroundColor: '#F5F5F5',
            borderBottomWidth: scale(3),
            borderBottomColor: '#F5F5F5',
            marginVertical: scale(10),
        }}>
            {/* عنوان القسم */}


            <Text style={{
                fontSize: scale(16),
                fontFamily: 'Almarai',
                fontWeight: '700',
                color: '#046132',
                textDecorationLine: 'underline',
                textAlign: 'right',
            }}>
                التوصيل
            </Text>


            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>{customerName}</Text>
                </View>
                <Text style={styles.MarketName}>
                    الاسم
                </Text>
            </View>

            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    {/* <RS color='#333' /> */}
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>{phoneNumber}</Text>
                </View>
                <Text style={styles.MarketName}>
                    رقم الهاتف
                </Text>
            </View>

            {/* رسوم التوصيل */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>
                        {city}
                    </Text>
                </View>
                <Text style={styles.MarketName}>
                    المدينة
                </Text>
            </View>

            {/* الخصم */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    {/* <RS color='#333' /> */}
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>{address}</Text>
                </View>
                <Text style={styles.MarketName}>
                    العنوان
                </Text>
            </View>

            {/* السعر النهائي */}
            <View
                style={styles.priceRow}>
                <View style={styles.priceBlock}>
                    {/* <RS color='#333' /> */}
                    <Text style={[styles.MarketDescription, { color: "#046132" }]}>{houseNumber}</Text>
                </View>
                <Text style={styles.MarketName}>
                    رقم المنزل
                </Text>
            </View>

        </View>
    )
}

export default DeliveryInfo

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
        color: '#878787',
        textAlign: 'right',
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