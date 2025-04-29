import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'
import OctiIcon from 'react-native-vector-icons/Octicons'
import AntIcon from 'react-native-vector-icons/AntDesign'

const AboutCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <View style={styles.imageWrapper}>
                    <Image
                        source={require('@/assets/images/Background.png')}
                        style={styles.image}
                    />
                </View>
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>متجر السعدي </Text>
                    <Text style={styles.description}>
                        لمنتجات الالبان و الاغذية المحلية لمنتجات الالبان و الاغذية المحلية لمنتجات الالبان و لمنتجات الالبان و
                    </Text>
                </View>
            </View>

            <View style={styles.infoSection}>
                <View style={styles.infoBox}>
                    <OctiIcon name="dot-fill" color="#036E65" size={scale(14)} />
                    <Text style={styles.infoText}>متاح الآن</Text>
                </View>

                <View style={styles.infoBox}>
                    <Icon name="location-pin" color="#036E65" size={scale(14)} />
                    <Text style={styles.infoText}>1.5 Km</Text>
                </View>

                <View style={styles.infoBox}>
                    <AntIcon name="clockcircle" color="#036E65" size={scale(14)} />
                    <Text style={styles.infoText}>20 - 30 د</Text>
                </View>
            </View>
        </View>
    )
}

export default AboutCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: scale(12),
        borderColor: '#C0DBD8',
        borderTopWidth: scale(1),
        borderBottomWidth: scale(1),
        paddingVertical: scale(12),
    },
    topSection: {
        flexDirection: 'row',
        width: '100%',
    },
    imageWrapper: {
        width: '40%',
        padding: scale(8),
    },
    image: {
        width: '100%',
        borderRadius: scale(14),
        aspectRatio: 1,
    },
    textWrapper: {
        width: '60%',
        padding: scale(8),
        justifyContent: "flex-start",
        gap: scale(10),
        alignItems: 'flex-end',
    },
    title: {
        fontFamily: 'Almarai',
        fontSize: scale(20),
        fontWeight: '700',
        textAlign: 'right',
    },
    description: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: '400',
        textAlign: 'right',
    },
    infoSection: {
        backgroundColor: '#C0DBD8',
        width: '100%',
        borderRadius: scale(8),
        padding: scale(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
        padding: scale(2),
    },
    infoText: {
        fontFamily: 'Almarai',
        fontSize: scale(13),
        lineHeight: scale(20),
        color: '#036E65',
        fontWeight: '600',
    },
})
