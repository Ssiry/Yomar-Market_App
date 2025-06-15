import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import OrderDone from '@/assets/svg/OrderDone'
import OrderStatus from './OrderStatus'
import PopUp from './PopUp'

const Waitting = () => {
    const [showOrderDetailsPopup, setShowOrderDetailsPopup] = useState(false);

    const orders = [
        {
            id: 1, orderNumber: '#DSERC-76618-717', status:
                'بانتظار الموافقة'
        },
        {
            id: 2, orderNumber: '#DSERC-88382-291', status:
                'بانتظار الموافقة'
        },
        {
            id: 3, orderNumber: '#DSERC-12345-678', status:
                'بانتظار الموافقة'

        },
        {
            id: 4, orderNumber: '#DSERC-99999-111', status:
                'بانتظار الموافقة'
        },
    ];
    return (
        <View style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
            gap: scale(10),
            marginTop: scale(5),
            marginBottom: scale(30),
        }}>
            {orders.map((order) => (
                <View key={order.id} style={styles.itemContainer}>
                    <OrderDone />
                    <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4) }}>
                        <View style={styles.orderInfoInnerView}>
                            <Text style={styles.infoTitl}>رقم الطلب </Text>
                            <Text style={styles.infoDescription}>{order.orderNumber}</Text>
                        </View>
                        <Text style={{ fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                            <Text style={{ fontWeight: '700' }} >حالة الطلب: </Text>
                            {order.status}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => setShowOrderDetailsPopup(true)}
                        style={styles.iconButton}>
                        <MaterialIcon name={'touch-app'} color={'#036E65'} size={scale(24)} />
                    </TouchableOpacity>
                </View>
            ))}


            <PopUp
                view1={
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>


                        <TouchableOpacity
                            onPress={() => setShowOrderDetailsPopup(false)}
                            style={styles.iconButton}>
                            <MaterialIcon name={'close'} color={'#036E65'} size={scale(24)} />

                        </TouchableOpacity>
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
                        <View style={styles.dummyView} />

                    </View>



                }
                view2={

                    <View style={{ height: scale(500), width: '100%' }}>
                        <OrderStatus />
                    </View>
                }
                btnText={'تم التجهيز (استدعاء المندوب)'}
                onPress={() => { }}
                // onPress={() => setShowOrderDetailsPopup(false)}
                isVisible={showOrderDetailsPopup}
            />

        </View>
    )
}

export default Waitting

const styles = StyleSheet.create({
    itemContainer: {
        width: '100%',
        height: scale(85),
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: "center",

        borderRadius: scale(8),
        borderWidth: scale(1),
        borderColor: '#4F9993',
        paddingHorizontal: scale(10),
    },
    orderInfoInnerView: {

        display: "flex",
        gap: scale(1),
        justifyContent: "center",
        alignItems: "flex-end",
        width: '100%'
    },
    infoTitl: {
        fontSize: scale(14),
        fontFamily: 'Almarai',
        fontWeight: '800',
        color: '#036E65'

    },
    infoDescription: {

        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '400',
        color: '#036E65',
        textAlign: 'right',
        lineHeight: scale(14)
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    dummyView: {
        width: scale(24),
        height: scale(24),
        backgroundColor: 'white',
        borderRadius: scale(8),
    }
})