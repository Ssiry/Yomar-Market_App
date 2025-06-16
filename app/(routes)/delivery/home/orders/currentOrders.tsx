import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const OrderData = [
    { id: 'DSERC-76618-717', status: 'تم توصيل الطلب', shop: 'متجر السعدي', total: '37.00', delivery: 'مجانا', discount: '1.00', items: '4' },

]

const CurrentOrders = () => {
    return (
        <View>
            {OrderData.map((order, index) => (
                <View style={styles.mainContainer} key={index}>
                    <View style={styles.innerContainer}>

                        {/* معلومات الطلب */}
                        <View style={styles.OrderInfoContainer}>
                            <View style={styles.orderInfoInnerView}>
                                <Text style={styles.infoTitl}>رقم الطلب</Text>
                                <Text style={styles.infoDescription}>#{order.id}</Text>
                            </View>

                            <View style={styles.orderInfoInnerView}>
                                <View style={styles.fromTo}>
                                    <Icon name={'ray-start-arrow'} color={'#036E65'} size={scale(18)} />
                                    <Text style={styles.infoTitl}>من</Text>
                                </View>
                                <Text style={styles.infoDescription}>{order.shop}</Text>
                            </View>

                            <View style={styles.orderInfoInnerView}>
                                <View style={styles.fromTo}>
                                    <Icon name={'ray-end'} color={'#036E65'} size={scale(18)} />
                                    <Text style={styles.infoTitl}>إلى</Text>
                                </View>
                                <Text style={styles.infoDescription}>عنوان العميل</Text>
                            </View>

                            {/* <View style={styles.orderInfoInnerView}>
                                <Text style={styles.infoTitl}>الحالة</Text>
                                <Text style={styles.infoDescription}>{order.status}</Text>
                            </View> */}
                        </View>

                        {/* مكان الخريطة بلون أخضر */}
                        <View style={styles.mapPlaceholder}>
                            <Icon name="map" size={scale(40)} color="#fff" />
                        </View>

                    </View>
                </View>
            ))}
        </View>
    )
}

export default CurrentOrders

const styles = StyleSheet.create({
    mainContainer: {
        alignSelf: "center",
        width: "98%",
        height: scale(180),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: scale(8),
        marginTop: scale(10),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: scale(0.15),
        shadowRadius: scale(2.84),
        elevation: scale(5),
    },
    innerContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
        borderRadius: scale(8),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    OrderInfoContainer: {
        width: "50%",
        height: "100%",
        borderTopLeftRadius: scale(8),
        borderBottomLeftRadius: scale(8),
        paddingVertical: scale(20),
        paddingHorizontal: scale(10),
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    orderInfoInnerView: {
        justifyContent: "center",
        alignItems: "flex-end",
    },
    fromTo: {
        flexDirection: "row-reverse",
        alignItems: "center",
        gap: scale(6),
    },
    infoTitl: {
        fontSize: scale(11),
        fontFamily: 'Almarai',
        fontWeight: '800',
        lineHeight: scale(15)
    },
    infoDescription: {
        fontSize: scale(10),
        fontFamily: 'Almarai',
        fontWeight: '400',
        color: '#036E65',
        textAlign: 'right',
        lineHeight: scale(14)
    },
    mapPlaceholder: {
        width: "50%",
        height: "100%",
        borderTopRightRadius: scale(8),
        borderBottomRightRadius: scale(8),
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
    },
})
