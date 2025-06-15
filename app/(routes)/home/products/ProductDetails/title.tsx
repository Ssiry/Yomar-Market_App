import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'
import RS from '@/assets/svg/RS'

const Title = () => {
    return (
        <View style={styles.infoSection}>
            <View style={styles.infoBox}>
                {/* <OctiIcon name="dot-fill" color="#036E65" size={scale(14)} /> */}
                <Text style={styles.nameText}>
                    منتج غذائي
                </Text>
            </View>

            <View style={styles.priceRateSection}>

                <View style={styles.infoBox}>
                    <Icon name="star" color="#046132" size={scale(20)} />
                    <Text style={styles.rateText}>4.5</Text>
                </View>

                <View style={styles.infoBox}>
                    <RS width={scale(20)} height={scale(20)} />
                    <Text style={styles.priceText}>٣٨.٥</Text>
                </View>
            </View>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({

    infoSection: {
        backgroundColor: '#C0DBD8',
        width: '100%',
        borderRadius: scale(8),
        padding: scale(8),
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        gap: scale(5),
        padding: scale(2),
    },
    nameText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        lineHeight: scale(28),
        color: '#046132',
        fontWeight: '600',
    },

    priceRateSection: {
        marginLeft: scale(5),
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: scale(15),
        padding: scale(2),
    },
    priceText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        lineHeight: scale(28),
        color: '#046132',
        fontWeight: '600',
    },
    rateText: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        lineHeight: scale(28),
        color: '#046132',
        fontWeight: '600',
    },
})