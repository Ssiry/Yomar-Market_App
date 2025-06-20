import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React from 'react'
// import MarketsMap from './MarketsMap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import CurrentOrders from '../main/currentOrders'
import AddDelivery from './addDelivery'
import DeleteDeliery from './deleteDeliery'
import Call from '../../../chat/Call'
import { Alert } from 'react-native';


const deliveryData = [
    {
        id: "43949348",
        name: "علي محمد",
        image: require('@/assets/images/Image.png'),

    },
    {
        id: "434322323",
        name: "وائل محمد",
        image: require('@/assets/images/product.png'),
    },
    {
        id: "32323244",
        name: " هادي العيدروس",
        image: require('@/assets/images/product2.jpg'),
    },
]

const index = () => {
    const [addDelivery, setAddDelivery] = React.useState(false)
    const [deleteDelivery, setDeleteDelivery] = React.useState(false)
    const [call, setCall] = React.useState(false)


    const handleCellularCall = async (phoneNumber: any) => {
        if (!phoneNumber) {
            Alert.alert("Error", "Phone number is not available.");
            return;
        }

        const url = `tel:${phoneNumber}`;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Error", "This device cannot make phone calls.");
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred when trying to make the call.");
        }
    };


    return (
        // <View style={{ width: "100%", height: "100%" }}>
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
                    {/* <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity> */}

                    <View style={styles.dummyView} />


                    <Text style={styles.pageTitleText}>
                        المندوب
                    </Text>

                    <TouchableOpacity style={styles.iconButton} onPress={() => setAddDelivery(true)} >
                        <Icon name="add-circle-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>
                </View>

                <AddDelivery isVisible={addDelivery} onPress={() => setAddDelivery(false)} />



                {deliveryData.map((item) => (


                    <View
                        key={item.id}
                        style={{

                            width: '100%', backgroundColor: '#E6F0F0', borderRadius: scale(22), marginTop: scale(14),
                            padding: scale(10),
                            paddingBottom: scale(15),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // gap: scale(10),
                            shadowColor: "#000",
                        }}>

                        {/* LINE ONE */}

                        <View style={[styles.Row, { width: '100%', backgroundColor: '#fff', paddingVertical: scale(10), paddingHorizontal: scale(5), borderRadius: scale(15) }]}>
                            <View style={[styles.Row, { gap: scale(3), }]}>

                                {/* delete icon  */}
                                <TouchableOpacity style={[styles.Touchable, { backgroundColor: '#FF6E6C', width: scale(30), borderRadius: scale(8), marginHorizontal: scale(4) }]} onPress={() => setDeleteDelivery(true)} >
                                    <Icon name={'trash'} size={scale(17)} color="#fff" />
                                </TouchableOpacity>

                                {/* image */}
                                <View style={{ width: 44, height: 44, }} >
                                    <Image
                                        source={item.image} // Replace with your image URL
                                        style={{ width: 44, height: 44, borderRadius: scale(100) }} // Adjust the size and border radius as needed
                                        resizeMode="cover" // Optional: adjust the image scaling
                                    />
                                </View>
                                {/* name & ID */}
                                <View style={{ height: 44, marginLeft: scale(4) }} >
                                    <Text style={{ fontFamily: 'Almarai', fontSize: scale(13), fontWeight: 'bold', color: '#333', marginBottom: scale(5) }}>
                                        {item.name}                                    </Text>
                                    <Text style={{ fontFamily: 'Almarai', fontSize: scale(12), color: '#878787' }}>
                                        #{item.id}
                                    </Text>
                                </View>
                            </View>

                            {/* call & message */}
                            <View style={[styles.Row, { gap: scale(6), }]}>

                                <TouchableOpacity style={[styles.Touchable]} onPress={() => {
                                    router.push('/(routes)/chat/ChatPage')
                                }}>
                                    <Icon name={'chatbox-ellipses-outline'} size={scale(20)} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.Touchable]} onPress={() => { setCall(true) }}>
                                    <Icon name={'call-outline'} size={scale(20)} color="#fff" />
                                </TouchableOpacity>
                            </View>


                        </View>


                        {/* LINE TWO */}
                        <CurrentOrders />


                    </View>
                ))}


            </ScrollView>


            {/* 
            MARK:-  MODALS START
            */}



            <Call
                visible={call}
                onConfirm={() => handleCellularCall('+966555333123')}
                onCancel={() => { setCall(false) }}
            />






            <DeleteDeliery
                visible={deleteDelivery}
                onConfirm={() => { setDeleteDelivery(false) }}
                onCancel={() => { setDeleteDelivery(false) }}
            />

            {/* 
            MARK:-  MODALS END
            */}




        </SafeAreaView>
        // </View>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    scrollView: { width: '100%', height: '100%', marginBottom: scale(-30) },

    iconButton: { backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', },
    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold'
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    Row: { display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'space-between', }
    ,
    Touchable: {
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        , width: 44, height: 44, backgroundColor: '#036E65', borderRadius: scale(100),
    }


})