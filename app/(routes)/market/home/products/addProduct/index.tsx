import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import BgPattern from '@/assets/svg/Pattern';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imagesUrls, setImagesUrls] = useState<string[]>([]);

    const handlePriceChange = (text: string) => {
        setPrice(text);
    };

    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handleQuantityChange = (text: string) => {
        setQuantity(text);
    };


    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            alert("من فضلك فعّل صلاحيات الوصول إلى الصور.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // ✅ استخدام MediaTypeOptions.Images
            allowsMultipleSelection: true,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled) {
            const selectedUris = result.assets.map(asset => asset.uri);
            setImagesUrls(prev => [...prev, ...selectedUris]);
        }
    };



    // const uploadImagesToCloudinary = async (imageUris: any) => {
    //     const uploadedUrls = [];

    //     for (const uri of imageUris) {
    //         const formData = new FormData();

    //         formData.append('file', {
    //             uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
    //             type: 'image/jpeg',
    //             name: 'photo.jpg',
    //         } as any);

    //         formData.append('upload_preset', 'my_unsigned'); // استبدله بالـ preset الحقيقي
    //         formData.append('cloud_name', 'dhdxjuw3v');

    //         try {
    //             const response = await axios.post(
    //                 'https://api.cloudinary.com/v1_1/dhdxjuw3v/image/upload',
    //                 formData,
    //                 {
    //                     headers: {
    //                         'Content-Type': 'multipart/form-data',
    //                     },
    //                 }
    //             );

    //             uploadedUrls.push(response.data.secure_url);
    //         } catch (error) {
    //             console.error('❌ Error uploading image:', uri, (error as any).message);
    //             // ممكن تضيف null أو تتجاهل الصورة بناءً على المطلوب
    //         }
    //     }

    //     return uploadedUrls;
    // };

    const uploadImagesToCloudinary = async (imageUris: string[]) => {
        const uploadedUrls: string[] = [];

        for (const uri of imageUris) {
            const formData = new FormData();

            formData.append('file', {
                uri, // لا تزيل "file://" على Expo
                type: 'image/jpeg',
                name: 'photo.jpg',
            } as any);

            formData.append('upload_preset', 'my_unsigned'); // تأكد أنها موجودة في إعدادات Cloudinary ومفعّلة كـ unsigned

            try {
                const response = await axios.post(
                    'https://api.cloudinary.com/v1_1/dhdxjuw3v/image/upload',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );

                uploadedUrls.push(response.data.secure_url);
            } catch (error) {
                if (error && typeof error === 'object' && 'response' in error) {
                    // @ts-ignore
                    console.error('❌ Error uploading image:', uri, error.response?.data || (error as any).message);
                } else {
                    console.error('❌ Error uploading image:', uri, (error as Error).message);
                }
            }
        }

        return uploadedUrls;
    };


    const handleSaveProduct = async () => {
        try {
            const token = await AsyncStorage.getItem('market/token');
            const marketId = await AsyncStorage.getItem('marketId');

            if (!token || !marketId) {
                Alert.alert("خطأ", "معلومات تسجيل الدخول غير متوفرة");
                return;
            }

            // رفع الصور إلى Cloudinary
            const uploadedImageUrls = await uploadImagesToCloudinary(imagesUrls);

            if (uploadedImageUrls.length === 0) {
                Alert.alert("خطأ", "لم يتم رفع أي صور");
                return;
            }

            const productData = {
                imgUrls: uploadedImageUrls,
                price: parseFloat(price),
                title: name,
                description: "لا يوجد وصف", // يمكن تعديله لاحقًا
                quantity: parseInt(quantity),
                marketId: parseInt(marketId),
                categoryId: 1 // 👈 يمكنك عمل اختيار ديناميكي لاحقًا
            };

            const response = await axios.post(
                'http://192.168.1.11:5007/market/products/create',
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201) {
                Alert.alert("تم", "تم إضافة المنتج بنجاح");
                setName('');
                setPrice('');
                setQuantity('');
                setImagesUrls([]);
            }
        } catch (error: any) {
            console.error("❌ Error:", error.response?.data || error.message);
            Alert.alert("فشل", error.response?.data?.error || "حدث خطأ أثناء إضافة المنتج");
        }
    };


    return (
        <SafeAreaView style={styles.safeContainer}>

            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >

                <View style={styles.modal}>
                    {/*
                     MARK:- Header 
                     */}
                    <View style={styles.pageTitle}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                            <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.pageTitleText}>
                            إضافة منتج جديد
                        </Text>
                        <View style={styles.dummyView} />
                    </View>

                    <Text style={styles.text1}>
                        يرجي التاكد من بيانات المنتج و عدم تكراره قبل الإضافة
                    </Text>

                    {/*  */}
                    <View style={{ width: '100%', }}>

                        {/* IMAGE SECTION */}
                        <TouchableOpacity style={{ alignSelf: 'center', paddingVertical: scale(20) }} onPress={pickImage}
                        >
                            <View style={{ alignItems: 'center' }}>
                                <View
                                    style={styles.view1}
                                >
                                    <Icon name="camera-outline" size={40} color="#036E65" />
                                </View>
                                <Text style={{ color: '#036E65', lineHeight: scale(20), fontFamily: 'Almarai', textAlign: 'center', fontSize: 13 }}>
                                    أضف صور المنتج (يمكنك اختيار أكثر من صورة)
                                </Text>
                            </View>
                        </TouchableOpacity>

                        {/* 
                        MARK:- selected images
                         */}
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: scale(10), marginBottom: scale(10) }}
                        >
                            {imagesUrls.map((uri, index) => (
                                <View key={index} style={{ position: 'relative', marginRight: scale(10) }}>
                                    <Image
                                        source={{ uri }}
                                        style={styles.image1}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            setImagesUrls(prev => prev.filter((_, i) => i !== index));
                                        }}
                                        style={styles.btn1}
                                    >
                                        <Icon name="close-circle" size={20} color="#f44" />
                                    </TouchableOpacity>
                                </View>
                            ))}
                        </ScrollView>

                        <Text style={[styles.inputHeader]}>اسم المنتج </Text>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={handleNameChange}
                            placeholder="اكتب اسم المنتج"
                            placeholderTextColor="#878787"
                        />

                        <View style={styles.view2}>

                            <View style={{ width: '50%' }}>
                                <Text style={[styles.inputHeader]}>سعر الجملة</Text>
                                <TextInput
                                    style={[styles.textInput]}
                                    value={price}
                                    keyboardType="numeric"
                                    onChangeText={handlePriceChange}
                                    placeholder="اكتب السعر "
                                    placeholderTextColor="#878787"
                                />
                            </View>

                            <View style={{ width: '47%' }}>

                                <Text style={[styles.inputHeader]}>سعر بالضريبة</Text>
                                <TextInput
                                    style={[styles.textInput]}
                                    value={price ? (Number(price) + Number(price) * 0.15).toString() : ''}
                                    keyboardType="numeric"
                                    placeholder=" السعر  + 15% ضريبة"
                                    placeholderTextColor="#878787"
                                    editable={false}
                                />
                            </View>



                        </View>

                        <Text style={[styles.inputHeader]}>الكمية</Text>
                        <TextInput
                            style={styles.textInput}
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={handleQuantityChange}
                            placeholder="اكتب الكمية "
                            placeholderTextColor="#878787"
                        />

                    </View>

                    {/*
                     MARK:- Button to add product
                    */}

                    <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => handleSaveProduct()}
                    >
                        <Text style={styles.text2}>
                            اضافة المنتج
                        </Text>

                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
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
        fontWeight: 'bold',
        lineHeight: scale(24),
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center',
        paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30)
    },
    modal: { width: '100%', backgroundColor: 'transparent', gap: scale(10), paddingHorizontal: scale(20), justifyContent: 'space-between', alignItems: 'center', },

    iconContainer: { width: "100%", },

    inputHeader: { marginTop: scale(14), fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: 'right', width: '100%', lineHeight: scale(20), color: '#333', },

    errorMessage: { fontSize: scale(12), fontFamily: 'Almarai', color: 'red', textAlign: 'left', width: '100%', marginTop: scale(4), lineHeight: scale(20), },

    textInput: { width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), textAlign: 'right', fontFamily: 'Almarai', fontSize: scale(12), },

    text1: { marginTop: scale(5), fontFamily: 'Almarai', color: '#878787', fontSize: scale(12), fontWeight: 'bold', lineHeight: scale(20) },
    view1: {
        width: 110,
        height: 110,
        borderRadius: 15,
        backgroundColor: '#E6F0F0',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#036E65',
        marginBottom: 8,
    },
    image1: {
        width: 80,
        height: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#0a7',
    },

    btn1: {
        position: 'absolute',
        top: -6,
        right: -6,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 2,
        borderWidth: 1,
        borderColor: '#eee',
        elevation: 2,
    },
    view2: { width: '100%', display: 'flex', flexDirection: 'row-reverse', gap: scale(10), },
    view3: { width: '100%', display: 'flex', flexDirection: 'column', gap: scale(10), justifyContent: 'center', alignItems: 'center', marginTop: scale(20), },
    btn2: { width: '100%', height: scale(50), backgroundColor: '#036E65', paddingVertical: scale(10), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center', },
    text2: { fontFamily: 'Almarai', color: '#fff', fontSize: scale(14), fontWeight: 'bold', textAlign: 'center', },



})