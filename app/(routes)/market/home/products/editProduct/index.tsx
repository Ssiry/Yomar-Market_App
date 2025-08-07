import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import BgPattern from '@/assets/svg/Pattern';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';

const index = () => {

    const API_BASE_URL = 'http://192.168.1.11:5007/market/products/product'; // غيّر IP لو لازم



    const [id, setId] = useState<number | null>();
    const [title, setTitle] = useState<string>('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [imagesUrls, setImagesUrls] = useState<string[]>([]);
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState<{ id: number, name: string }[]>([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);




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


    const handleUpdateProduct = async () => {
        if (!id) {
            Alert.alert('خطأ', 'لا يمكن تحديد المنتج المطلوب تعديله.');
            return;
        }

        try {
            setLoading(true);

            // 1. ارفع الصور الجديدة فقط
            const localImages = imagesUrls.filter(uri => uri.startsWith('file://'));
            const uploadedImages = await uploadImagesToCloudinary(localImages);

            // 2. اجمع الصور النهائية (القديمة + الجديدة)
            const remoteImages = imagesUrls.filter(uri => uri.startsWith('http'));
            const finalImages = [...remoteImages, ...uploadedImages];

            // 3. احصل على التوكن
            const token = await AsyncStorage.getItem('token');

            // 4. إرسال التحديث
            const response = await axios.put(
                `http://192.168.1.11:5007/market/products/update/${id}`,
                {
                    imgUrls: finalImages,
                    title: title,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    description,
                    categoryId: selectedCategoryId,
                    marketId: 1 // إذا كنت تربط المنتج بسوق معين ثابت حالياً
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            Alert.alert('تم التحديث', 'تم تعديل المنتج بنجاح');
            router.back();

        } catch (err) {
            console.error('❌ Error updating product:', err);
            Alert.alert('خطأ', 'حدث خطأ أثناء تعديل المنتج');
        } finally {
            setLoading(false);
        }
    };


    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://192.168.1.11:5007/market/products/categories'); // عدّل الرابط حسب عنوان السيرفر
            setCategories(response.data);
        } catch (err) {
            console.error('❌ Error fetching categories:', err);
            setError('حدث خطأ أثناء جلب التصنيفات');
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async () => {

    }

    useEffect(() => {
        fetchCategories();
        fetchProduct();
    }, [])




    const fetchProductById = async (selectedId: number) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${selectedId}`);
            // console.log('Fetched product link:', `${API_BASE_URL}/${id}`);
            console.log('Fetched product:', response.data);
            return response.data;
        } catch (error) {
            console.error('❌ Error fetching product by ID:', error);
            throw error;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            const selectedId = Number(await AsyncStorage.getItem('selectedProductId'));
            setId(selectedId);
            console.log('Selected product ID:', id);


            if (selectedId !== null && selectedId !== undefined) {
                fetchProductById(selectedId)
                    .then((data) => {
                        console.log('Fetched product data:', data);
                        // setProduct(data);
                        setTitle(data.title)
                        setImagesUrls(data.imgUrls)
                        setQuantity(
                            String(data.quantity)
                        )
                        setPrice(
                            String(data.price)
                        )
                        setDescription(data.description)
                        setSelectedCategoryId(data.categoryId)

                    })
                    .catch((error) => {
                        setError('Error fetching product: ' + error);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            } else {
                setError('Product ID is missing');
                setLoading(false);
            }
        };

        fetchData();
    }, []);






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
                            تعديل منتج
                        </Text>
                        <View style={styles.dummyView} />
                    </View>

                    <Text style={styles.text1}>
                        يرجي التاكد من بيانات المنتج
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
                            value={title}
                            onChangeText={setTitle}
                            placeholder="اكتب اسم المنتج"
                            placeholderTextColor="#878787"
                        />

                        <Text style={styles.inputHeader}>الفئة</Text>
                        <View style={styles.pickerWrapper}>
                            <Picker
                                selectedValue={selectedCategoryId}
                                onValueChange={(itemValue) => setSelectedCategoryId(itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label="اختر فئة المنتج" value={null} />
                                {categories.map(category => (
                                    <Picker.Item key={category.id} label={category.name} value={category.id} />
                                ))}
                            </Picker>
                        </View>

                        {/* وصف المنتج  */}
                        <Text style={[styles.inputHeader]}>وصف المنتج</Text>
                        <TextInput
                            style={styles.textInput}
                            value={description}
                            onChangeText={setDescription}
                            placeholder="اكتب وصف المنتج"
                            placeholderTextColor="#878787"
                        />

                        <View style={styles.view2}>

                            <View style={{ width: '50%' }}>
                                <Text style={[styles.inputHeader]}>سعر الجملة</Text>
                                <TextInput
                                    style={[styles.textInput]}
                                    value={price}
                                    keyboardType="numeric"
                                    onChangeText={setPrice}
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
                            value={String(quantity)}
                            keyboardType="numeric"
                            onChangeText={setQuantity}
                            placeholder="اكتب الكمية "
                            placeholderTextColor="#878787"
                        />

                    </View>

                    {/*
                     MARK:- Button to add product
                    */}

                    <TouchableOpacity
                        style={styles.btn2}
                        onPress={() => handleUpdateProduct()}
                    >
                        {loading ? (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: scale(10) }}>
                                <Icon name="sync-outline" size={20} color="#fff" style={{ marginRight: scale(10) }} />
                                <Text style={styles.text2}>جاري الإضافة</Text>
                            </View>
                        ) : (
                            <Text style={styles.text2}>
                                اضافة المنتج
                            </Text>
                        )}

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

    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
    },

    picker: {
        height: scale(40),
        width: '100%',
    },

})