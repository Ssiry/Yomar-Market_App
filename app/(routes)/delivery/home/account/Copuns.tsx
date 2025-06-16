import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import BgPattern from '@/assets/svg/Pattern';

interface Coupon {
    code: string;
    discount: number; // percentage
    description: string;
}

const Coupons = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [coupons, setCoupons] = useState<Coupon[]>([]);

    const handleAddCoupon = () => {
        if (!code || !discount || isNaN(Number(discount))) {
            Alert.alert('خطأ', 'يرجى إدخال بيانات صحيحة للكوبون والخصم');
            return;
        }

        const newCoupon: Coupon = {
            code,
            discount: parseFloat(discount),
            description,
        };

        setCoupons([...coupons, newCoupon]);
        setCode('');
        setDiscount('');
        setDescription('');
        Alert.alert('تم', 'تم إنشاء الكوبون بنجاح');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            {/* <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: scale(20) }}>
                <MaterialIcon name='sale' size={scale(60)} color={"#036E65"} />
                <Text style={styles.title}>إنشاء كوبون خصم</Text>
            </View> */}

            {/* Page Title */}
            <View style={styles.pageTitle}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                </TouchableOpacity>
                <Text style={styles.pageTitleText}>
                    إنشاء كوبون خصم
                </Text>
                <View style={styles.dummyView} />
            </View>


            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>


                <TextInput
                    placeholder="رمز الكوبون"
                    value={code}
                    onChangeText={setCode}
                    style={styles.input}
                    placeholderTextColor="#888"
                />

                <TextInput
                    placeholder="نسبة الخصم %"
                    value={discount}
                    onChangeText={setDiscount}
                    keyboardType="numeric"
                    style={styles.input}
                    placeholderTextColor="#888"
                />
            </View>


            <TextInput
                placeholder="وصف الكوبون (اختياري)"
                value={description}
                onChangeText={setDescription}
                style={[styles.input, { width: '100%' }]}
                placeholderTextColor="#888"
            />

            <TouchableOpacity onPress={handleAddCoupon} style={styles.button}>
                <Text style={styles.buttonText}>إضافة كوبون</Text>
            </TouchableOpacity>

            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingVertical: scale(20) }}>
                <View style={{ height: 3, width: 80, backgroundColor: '#036E65', borderRadius: 3 }} />
                <Text style={[styles.title]}>الكوبونات الحالية</Text>
                <View style={{ height: 3, width: 80, backgroundColor: '#036E65', borderRadius: 3 }} />
            </View>
            <FlatList
                data={coupons}
                keyExtractor={(item, index) => item.code + index}
                renderItem={({ item, index }) => (
                    <View style={styles.couponCard}>


                        <TouchableOpacity style={styles.iconButton} onPress={() => {
                            // Handle delete action
                            Alert.alert(
                                'تأكيد الحذف',
                                'هل أنت متأكد أنك تريد حذف هذا الكوبون؟',
                                [
                                    {
                                        text: 'إلغاء',
                                        style: 'cancel',
                                    },
                                    {
                                        text: 'حذف',
                                        style: 'destructive',
                                        onPress: () => {
                                            setCoupons(coupons.filter((_, i) => i !== index));
                                            Alert.alert('تم', 'تم حذف الكوبون بنجاح');
                                        },
                                    },
                                ],
                            )

                        }}>
                            <Icon name="trash" size={scale(24)} color="#333" />
                        </TouchableOpacity>


                        <View style={{
                            flex: 1, marginRight: scale(10),
                            alignItems: 'flex-end', justifyContent: 'center'
                        }}>

                            <Text style={styles.couponText}>رمز:{' '}
                                <Text style={{ fontWeight: 'bold', color: '#036E65' }}>
                                    {item.code}
                                </Text>
                            </Text>
                            <Text style={styles.couponText}>الخصم:{' '}
                                <Text style={{ fontWeight: 'bold', color: '#036E65' }}>
                                    %{item.discount}
                                </Text>
                            </Text>
                            {item.description ? (
                                <Text style={styles.couponText}>الوصف:{' '}
                                    <Text style={{ fontWeight: 'bold', color: '#036E65' }}>

                                        {item.description}</Text>
                                </Text>
                            ) : null}

                        </View>
                        <MaterialIcon name='sale' size={scale(40)} color={"#036E65"} />
                        {/* change the null with empty svg soon */}
                    </View>
                )
                }
            />
        </SafeAreaView >
    );
};

export default Coupons;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: scale(20),
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        lineHeight: scale(24),
        fontWeight: 'bold',
        // marginBottom: scale(10),
        // backgroundColor: '#ff0',
        color: '#036E65',
        textAlign: 'center',
    },
    input: {
        width: '48%',
        height: scale(45),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
        textAlign: 'right',
        fontFamily: 'Almarai',
        color: '#000'
    },
    button: {
        backgroundColor: '#036E65',
        borderRadius: scale(100),
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',

    },
    buttonText: {
        fontFamily: 'Almarai',
        color: '#fff',
        fontSize: scale(14),
        fontWeight: 'bold'
    },
    couponCard: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: scale(10),
        padding: scale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: scale(10),
        backgroundColor: '#f9f9f9'
    },
    couponText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#333'
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
    pageTitle: {
        width: '100%',
        height: scale(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: scale(10),
        // paddingHorizontal: scale(24),

    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        lineHeight: scale(24),
        fontWeight: 'bold',
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
    },
});
