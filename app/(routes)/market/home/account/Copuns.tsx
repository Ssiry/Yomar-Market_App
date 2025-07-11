import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Alert,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Clipboard from 'expo-clipboard';
import BgPattern from '@/assets/svg/Pattern';

import DateTimePicker from '@react-native-community/datetimepicker'; // تأكد من تثبيته
import { Picker } from '@react-native-picker/picker';


import RadioGroup from 'react-native-radio-buttons-group'; // تأكد من تثبيته أو استبداله يدوياً إن أردت

type DiscountType = 'percentage' | 'fixed';

interface Coupon {
    code: string;
    discount: number;
    discountType: DiscountType;
    description: string;
    maxDiscount?: number;
    expiryDate?: string;
    usageLimit?: number;
}

const Coupons = () => {
    const [code, setCode] = useState('');
    const [discount, setDiscount] = useState('');
    const [description, setDescription] = useState('');
    const [maxDiscount, setMaxDiscount] = useState('');
    const [discountType, setDiscountType] = useState<DiscountType>('percentage');
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [expiryDate, setExpiryDate] = useState('');
    const [usageLimit, setUsageLimit] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);


    const handleAddCoupon = () => {
        const usage = parseInt(usageLimit);
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

        if (expiryDate && !dateRegex.test(expiryDate)) {
            Alert.alert('خطأ', 'تاريخ الانتهاء غير صالح. استخدم الصيغة: YYYY-MM-DD');
            return;
        }

        if (usageLimit && (isNaN(usage) || usage <= 0)) {
            Alert.alert('خطأ', 'عدد مرات الاستخدام غير صالح');
            return;
        }

        const newCoupon: Coupon = {
            code,
            discount: parseFloat(discount),
            discountType,
            description,
            maxDiscount: discountType === 'percentage' && maxDiscount ? parseFloat(maxDiscount) : undefined,
            expiryDate: expiryDate || undefined,
            usageLimit: usageLimit ? usage : undefined,
        };

        setCoupons([...coupons, newCoupon]);

        // Clear inputs
        setCode('');
        setDiscount('');
        setDescription('');
        setMaxDiscount('');
        setExpiryDate('');
        setUsageLimit('');
    };




    const copyToClipboard = async (text: string) => {
        await Clipboard.setStringAsync(text);
        Alert.alert('تم النسخ', 'تم نسخ رمز الكوبون');
    };

    return (
        <SafeAreaView style={styles.container}>
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

            {/* نوع الخصم */}
            <View style={{ width: '100%', marginBottom: scale(10), flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#e5e5e5', padding: scale(10), borderRadius: scale(8) }}>

                <Text style={[{
                    fontFamily: 'Almarai',
                    fontSize: scale(12),
                    color: '#555',
                    textAlign: 'right',
                }, {
                    width: '29%', lineHeight: scale(20),
                }]}>نوع الخصم</Text>

                <View style={{ flexDirection: 'row', gap: scale(20), width: '70%' }}>
                    <TouchableOpacity onPress={() => setDiscountType('percentage')} style={styles.radioButton}>
                        <Icon name={discountType === 'percentage' ? 'radio-button-on' : 'radio-button-off'} size={scale(18)} color="#036E65" />
                        <Text style={styles.radioLabel}>نسبة مئوية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setDiscountType('fixed')} style={styles.radioButton}>
                        <Icon name={discountType === 'fixed' ? 'radio-button-on' : 'radio-button-off'} size={scale(18)} color="#036E65" />
                        <Text style={styles.radioLabel}>قيمة ثابتة</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* رمز الكوبون */}
            <View style={[styles.couponRow]}>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>رمز الكوبون</Text>
                    <TextInput
                        placeholder="مثال: SALE50"
                        value={code}
                        onChangeText={setCode}
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                </View>
                <View style={{ width: '48%' }}>
                    <Text style={styles.label}>
                        {discountType === 'percentage' ? 'نسبة الخصم %' : 'قيمة الخصم (جنيه)'}
                    </Text>
                    <TextInput
                        placeholder={discountType === 'percentage' ? "مثال: 20" : "مثال: 50"}
                        value={discount}
                        onChangeText={setDiscount}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                </View>
            </View>

            {/* الحد الأقصى */}
            {discountType === 'percentage' && (
                <View style={{ width: '100%' }}>
                    <Text style={styles.label}>الحد الأقصى للخصم (اختياري)</Text>
                    <TextInput
                        placeholder="مثال: 50"
                        value={maxDiscount}
                        onChangeText={setMaxDiscount}
                        keyboardType="numeric"
                        style={styles.input}
                        placeholderTextColor="#888"
                    />
                </View>
            )}

            {/* الوصف وزر الإضافة */}
            <View style={{ width: '100%' }}>
                <Text style={styles.label}>الوصف (اختياري)</Text>
                <TextInput
                    placeholder="مثال: خصم العيد"
                    value={description}
                    onChangeText={setDescription}
                    style={styles.input}
                    placeholderTextColor="#888"
                />
            </View>


            <View style={styles.row}>
                {/* Expiry Date Picker */}
                <View style={styles.halfWidth}>
                    <Text style={styles.label}>تاريخ الصلاحية</Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        style={[styles.input, styles.dateInput]}
                    >
                        <Icon name="calendar-outline" size={scale(18)} color="#888" style={styles.iconMargin} />
                        <Text style={[styles.textRight, { color: expiryDate ? '#000' : '#888' }]}>
                            {expiryDate || 'اختر التاريخ'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Usage Limit Picker */}
                <View style={styles.halfWidth}>
                    <Text style={styles.label}>مرات الاستخدام</Text>
                    <View style={styles.pickerWrapper}>
                        <Picker
                            selectedValue={usageLimit}
                            onValueChange={(value) => setUsageLimit(value)}
                            style={styles.picker}
                            dropdownIconColor="#555"
                        >
                            <Picker.Item label="غير محدد" value="" />
                            {[1, 5, 10, 20, 50, 100, 150].map((num) => (
                                <Picker.Item key={num} label={`${num}`} value={String(num)} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </View>

            {showDatePicker && (
                <DateTimePicker
                    value={expiryDate ? new Date(expiryDate) : new Date()}
                    mode="date"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedDate) => {
                        setShowDatePicker(false);
                        if (selectedDate) {
                            const isoDate = selectedDate.toISOString().split('T')[0];
                            setExpiryDate(isoDate);
                        }
                    }}
                />
            )}


            <TouchableOpacity onPress={handleAddCoupon} style={styles.button}>
                <Text style={styles.buttonText}>إضافة كوبون</Text>
            </TouchableOpacity>

            {/* عنوان الكوبونات */}
            <View style={styles.couponsHeader}>
                <View style={styles.couponLine} />
                <Text style={styles.title}>الكوبونات الحالية</Text>
                <View style={styles.couponLine} />
            </View>


            {/* قائمة الكوبونات */}
            <FlatList
                data={coupons}
                keyExtractor={(item, index) => item.code + index}
                renderItem={({ item, index }) => (
                    <View style={styles.couponCard}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => {
                            Alert.alert('تأكيد الحذف', 'هل أنت متأكد أنك تريد حذف هذا الكوبون؟', [
                                { text: 'إلغاء', style: 'cancel' },
                                {
                                    text: 'حذف',
                                    style: 'destructive',
                                    onPress: () => setCoupons(coupons.filter((_, i) => i !== index)),
                                },
                            ]);
                        }}>
                            <Icon name="trash" size={scale(24)} color="#333" />
                        </TouchableOpacity>

                        <View style={styles.couponDetails}>
                            <Text style={styles.couponText}>
                                رمز: <Text style={styles.couponHighlight}>{item.code}</Text>{' '}
                                <TouchableOpacity onPress={() => copyToClipboard(item.code)}>
                                    <Icon name="copy-outline" size={scale(16)} color="#036E65" />
                                </TouchableOpacity>
                            </Text>
                            <Text style={styles.couponText}>
                                الخصم:{" "}
                                <Text style={styles.couponHighlight}>
                                    {item.discountType === 'percentage' ? `%${item.discount}` : `${item.discount} ج.م`}
                                </Text>
                            </Text>
                            {item.discountType === 'percentage' && item.maxDiscount && (
                                <Text style={styles.couponText}>
                                    الحد الأقصى: <Text style={styles.couponHighlight}>{item.maxDiscount} ج.م</Text>
                                </Text>
                            )}
                            {item.description ? (
                                <Text style={styles.couponText}>
                                    الوصف: <Text style={styles.couponHighlight}>{item.description}</Text>
                                </Text>
                            ) : null}
                        </View>
                        <MaterialIcon name="sale" size={scale(40)} color="#036E65" />
                    </View>
                )}
            />
        </SafeAreaView>
    );
};

export default Coupons;

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(4),
    },
    radioLabel: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#036E65',
    }
    ,
    container: {
        flex: 1,
        padding: scale(20),
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
        color: '#036E65',
        textAlign: 'center',
    },
    label: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        color: '#555',
        marginBottom: scale(4),
        textAlign: 'right',
        lineHeight: scale(20),
    },
    input: {
        height: scale(45),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        marginBottom: scale(10),
        textAlign: 'right',
        fontFamily: 'Almarai',
        color: '#000',
    },
    button: {
        backgroundColor: '#036E65',
        borderRadius: scale(100),
        height: scale(45),
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: scale(10),
    },
    buttonText: {
        fontFamily: 'Almarai',
        color: '#fff',
        fontSize: scale(14),
        fontWeight: 'bold',
    },
    couponRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
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
        backgroundColor: '#f9f9f9',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: Platform.OS === 'android' ? 3 : 0,
    },
    couponText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#333',
        marginBottom: 2,
    },
    couponHighlight: {
        fontWeight: 'bold',
        color: '#036E65',
    },
    couponDetails: {
        flex: 1,
        marginRight: scale(10),
        alignItems: 'flex-end',
        justifyContent: 'center',
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
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
    },
    couponsHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: scale(20),
    },
    couponLine: {
        height: 3,
        width: 80,
        backgroundColor: '#036E65',
        borderRadius: 3,
    },

    pickerInputStyle: {
        height: scale(45),
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: scale(8),
        marginBottom: scale(10),
        justifyContent: 'center',
        paddingHorizontal: scale(10),
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    row: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: scale(8),
    },

    halfWidth: {
        width: '49%',
    },

    dateInput: {
        flexDirection: 'row-reverse',
        alignItems: 'center',
    },

    pickerWrapper: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: scale(8),
        backgroundColor: '#fff',
        justifyContent: 'center',
        height: scale(45),
        overflow: 'hidden',
        marginBottom: scale(10),
    },

    picker: {
        fontFamily: 'Almarai',
        color: '#000',
    },

    iconMargin: {
        marginLeft: scale(6),
    },

    textRight: {
        fontFamily: 'Almarai',
        textAlign: 'right',
    },

});
