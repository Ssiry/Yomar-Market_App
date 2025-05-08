import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import OrderDone from '@/assets/svg/OrderDone'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PopUp from './PopUp'
import OrderDetails from './orderDetails'

const LastOrders = () => {
    const [viewOrderDetails, setViewOrderDetails] = useState(false);




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


            {/* 
            MARK:- item 1
             */}
            <View style={styles.itemContainer}>

                <OrderDone />

                <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4) }}>

                    <View style={styles.orderInfoInnerView}>
                        <Text style=
                            {styles.infoTitl}>رقم الطلب </Text>
                        <Text style={styles.infoDescription}>#DSERC-76618-717</Text>
                    </View>
                    <Text style={{ fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                        <Text style={{ fontWeight: '700' }} >
                            حالة الطب:
                        </Text>{' '}
                        تم توصيل الطلب
                    </Text>

                </View>

                <TouchableOpacity
                    onPress={() => {
                        setViewOrderDetails(true)
                    }}
                    style={styles.iconButton} >
                    <Icon name={'touch-app'} color={'#036E65'} size={scale(24)} />
                </TouchableOpacity>
            </View>





            {/* 
            MARK:- item 2
             */}
            <View style={styles.itemContainer}>

                <OrderDone />

                <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4) }}>

                    <View style={styles.orderInfoInnerView}>
                        <Text style=
                            {styles.infoTitl}>رقم الطلب </Text>
                        <Text style={styles.infoDescription}>#DSERC-76618-717</Text>
                    </View>
                    <Text style={{ fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                        <Text style={{ fontWeight: '700' }} >
                            حالة الطب :
                        </Text>{' '}
                        تم توصيل الطلب
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setViewOrderDetails(true)
                    }}
                    style={styles.iconButton} >
                    <Icon name={'touch-app'} color={'#036E65'} size={scale(24)} />
                </TouchableOpacity>
            </View>

            {/* 
            MARK:- item 3
             */}
            <View style={styles.itemContainer}>

                <OrderDone />

                <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4) }}>

                    <View style={styles.orderInfoInnerView}>
                        <Text style=
                            {styles.infoTitl}>رقم الطلب </Text>
                        <Text style={styles.infoDescription}>#DSERC-76618-717</Text>
                    </View>
                    <Text style={{ fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                        <Text style={{ fontWeight: '700' }} >
                            حالة الطب :
                        </Text>{' '}
                        تم توصيل الطلب
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setViewOrderDetails(true)
                    }}
                    style={styles.iconButton} >
                    <Icon name={'touch-app'} color={'#036E65'} size={scale(24)} />
                </TouchableOpacity>
            </View>

            {/* 
            MARK:- item 4
             */}
            <View style={styles.itemContainer}>

                <OrderDone />

                <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4) }}>

                    <View style={styles.orderInfoInnerView}>
                        <Text style=
                            {styles.infoTitl}>رقم الطلب </Text>
                        <Text style={styles.infoDescription}>#DSERC-76618-717</Text>
                    </View>
                    <Text style={{ fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                        <Text style={{ fontWeight: '700' }} >
                            حالة الطب :
                        </Text>{' '}
                        تم توصيل الطلب
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => {
                        setViewOrderDetails(true)
                    }}
                    style={styles.iconButton} >
                    <Icon name={'touch-app'} color={'#036E65'} size={scale(24)} />
                </TouchableOpacity>
            </View>


            {/* 
            MARK:- PopUp
             */}
            <PopUp

                view1={
                    <View style={[styles.itemContainer, {
                        flexDirection: 'row', borderWidth: scale(0),
                    }]}>

                        <OrderDone />

                        <View style={{ display: 'flex', alignItems: 'flex-end', gap: scale(4), width: '70%' }}>

                            <View style={styles.orderInfoInnerView}>
                                <Text style=
                                    {styles.infoTitl}>رقم الطلب </Text>
                                <Text style={styles.infoDescription}>#DSERC-76618-717</Text>
                            </View>
                            <Text style={{ textAlign: 'right', fontFamily: 'Almarai', lineHeight: 18, fontSize: scale(12) }}>
                                تم توصيل الطلب
                            </Text>
                        </View>

                    </View>}


                view2={
                    // <LastOrders />
                    // <Text>hi</Text>
                    <OrderDetails />
                }
                btnText={'اعادة الطلب'}
                onPress={() => {
                    setViewOrderDetails(false)
                }}
                isVisible={viewOrderDetails}

            />

        </View>
    )
}

export default LastOrders

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
})