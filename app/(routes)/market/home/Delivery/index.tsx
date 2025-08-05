import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
// import MarketsMap from './MarketsMap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import CurrentOrders from '../main/currentOrders'
import AddDelivery from './addDelivery'
import ControlDeliveryModal from './controlDelivery'
import Call from '../../../chat/Call'
import { Alert } from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


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

type Delivery = {
    id: string;
    imguri: string;
    phone: string;
    // Add other fields if needed
};

const index = () => {

    const [addDelivery, setAddDelivery] = useState(false)
    const [controlDelivery, setControlDelivery] = useState(false)
    const [call, setCall] = useState(false)
    const [selectedDeilvery, setSelectedDeilvery] = useState<Number>(0)


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

    const handleDeleteDelivery = async (deliveryId: Number) => {
        try {
            const token = await AsyncStorage.getItem('token'); // تأكد من أن التوكن مخزن

            const response = await axios.delete(`http://192.168.1.11:5007/market/deliveries/${deliveryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // إذا كان المحمي بالتوكن
                }
            });

            if (response.status === 200) {
                Alert.alert("✅ تم", "تم حذف المندوب بنجاح");
                // قم بتحديث قائمة المناديب بعد الحذف
                fetchMarketDeliveries();
            } else {
                Alert.alert("⚠️", "فشل في حذف المندوب");
            }
        } catch (error: any) {
            console.error("❌ Deletion error:", error);
            Alert.alert("❌ خطأ", "حدث خطأ أثناء الحذف");
        }
        setControlDelivery(false);

    };



    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchMarketDeliveries = async () => {
        setLoading(true);
        try {
            const marketId = await AsyncStorage.getItem('marketId');
            if (!marketId) {
                Alert.alert("⚠️", "لم يتم العثور على رقم السوق");
                return;
            }

            const response = await axios.get(`http://192.168.1.11:5007/market/deliveries/${marketId}`);
            setDeliveries(response.data);
        } catch (error) {
            console.error("❌ Error fetching market deliveries:", error);
            Alert.alert("خطأ", "تعذر تحميل الكباتن لهذا السوق");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchMarketDeliveries();
    }, []);

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

                    <View style={styles.dummyView} />

                    <Text style={styles.pageTitleText}> المندوب  </Text>

                    <TouchableOpacity style={styles.iconButton} onPress={() => setAddDelivery(true)} >
                        <Icon name="add-circle-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>

                </View>

                <AddDelivery isVisible={addDelivery} onPress={() => {
                    fetchMarketDeliveries();
                    setAddDelivery(false)

                }} />



                {deliveries.map((item) => (
                    <View
                        key={item.id}
                        style={{
                            width: '100%',
                            backgroundColor: '#E6F0F0',
                            borderRadius: scale(22),
                            marginTop: scale(14),
                            padding: scale(10),
                            paddingBottom: scale(15),
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#000",
                        }}
                    >
                        {/* LINE ONE */}
                        <View style={[styles.Row, { width: '100%', backgroundColor: '#fff', paddingVertical: scale(10), paddingHorizontal: scale(5), borderRadius: scale(15) }]}>
                            <View style={[styles.Row, { gap: scale(3) }]}>

                                {/* Delete or Control button */}
                                <TouchableOpacity
                                    style={[styles.Touchable, { backgroundColor: '#E5E5E5', width: scale(30), borderRadius: scale(8), marginHorizontal: scale(4) }]}
                                    onPress={() => {
                                        setSelectedDeilvery(Number(item.id))
                                        console.log('ID: ', Number(item.id))
                                        setControlDelivery(true)
                                    }}
                                >
                                    <Icon name={'ellipsis-horizontal-circle-outline'} size={scale(20)} color="#333" />
                                </TouchableOpacity>

                                {/* image */}
                                <View style={{ width: 44, height: 44 }} >
                                    <Image
                                        // source={item.imguri ? { uri: item.imguri } : require('@/assets/images/character.png')} // ✅ dynamically loaded from backend
                                        source={require('@/assets/images/character.png')} // ✅ dynamically loaded from backend


                                        style={{ width: 44, height: 44, borderRadius: scale(100) }}
                                        resizeMode="cover"
                                    />
                                </View>

                                {/* name & phone */}
                                <View style={{ height: 44, marginLeft: scale(4) }} >
                                    <Text style={{ fontFamily: 'Almarai', fontSize: scale(13), fontWeight: 'bold', color: '#333', marginBottom: scale(5) }}>
                                        {item.phone}
                                    </Text>
                                    <Text style={{ fontFamily: 'Almarai', fontSize: scale(12), color: '#878787' }}>
                                        #{item.id}
                                    </Text>
                                </View>
                            </View>

                            {/* call & message */}
                            <View style={[styles.Row, { gap: scale(6) }]}>
                                <TouchableOpacity style={[styles.Touchable]} onPress={() => router.push('/(routes)/chat/ChatPage')}>
                                    <Icon name={'chatbox-ellipses-outline'} size={scale(20)} color="#fff" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.Touchable]} onPress={() => handleCellularCall(item.phone)}>
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






            <ControlDeliveryModal
                visible={controlDelivery}
                onDelete={() => { handleDeleteDelivery(selectedDeilvery) }}
                onCancel={() => { setControlDelivery(false) }}
            />





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