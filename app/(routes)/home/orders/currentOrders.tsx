import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const CurrentOrders = () => {
    return (
        <>
            <View style={styles.mainContainer}>
                <View style={styles.innerContainer}>

                    {/*
                MARK:- Order Info 
                */}

                    <View style={styles.OrderInfoContainer}>

                        <View style={styles.orderInfoInnerView}>
                            <Text style=
                                {styles.infoTitl}>رقم الطلب </Text>
                            <Text style={styles.infoDescription} >
                                #DSERC-76618-717
                            </Text>
                        </View>

                        <View style={styles.orderInfoInnerView}>
                            <View style={styles.fromTo}>
                                <Icon name={'ray-start-arrow'} color={'#036E65'} size={scale(18)} />
                                <Text style={styles.infoTitl}>من</Text>
                            </View>
                            <Text style={styles.infoDescription}>توصيل من توصيل من توصيل من توصيل من</Text>
                        </View>

                        <View style={styles.orderInfoInnerView}>
                            <View style={styles.fromTo}>
                                <Icon name={'ray-end'} color={'#036E65'} size={scale(18)} />
                                <Text style={styles.infoTitl}>الي</Text>
                            </View>
                            <Text style={styles.infoDescription}>توصيل الي توصيل الي توصيل الي توصيل الي</Text>
                        </View>



                    </View>

                    {/* 
                    MARK:- MAP 
                */}
                    <View style={{
                        width: "50%",
                        height: "100%",
                        borderTopRightRadius: scale(8),
                        borderBottomRightRadius: scale(8),
                        backgroundColor: '#1d2',
                    }} />

                </View>
            </View>
        </>

    )
}

export default CurrentOrders

const styles = StyleSheet.create({
    mainContainer: {

        width: "96%",
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
        height: "100%", backgroundColor: "#fff",
        borderRadius: scale(8),
        display: "flex",
        flexDirection: "row",
        gap: scale(0),
        justifyContent: "space-between",
        alignItems: "center",
    },
    OrderInfoContainer: {
        width: "50%",
        height: "100%",
        // backgroundColor: '#1dd',
        borderTopLeftRadius: scale(8),
        borderBottomLeftRadius: scale(8),
        paddingVertical: scale(15),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: scale(10),
        padding: scale(10),
    },
    orderInfoInnerView: {

        display: "flex",
        gap: scale(1),
        justifyContent: "center",
        alignItems: "flex-end",
    },
    fromTo: {
        display: "flex",
        gap: scale(6),
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: "center",
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
})