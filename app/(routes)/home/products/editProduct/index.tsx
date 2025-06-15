import { SafeAreaView, ScrollView, StyleSheet, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import BgPattern from '@/assets/svg/Pattern';


const index = () => {
    const [name, setName] = useState('منتج رقم ٢');
    const [price, setPrice] = useState('38.4');
    const [quantity, setQuantity] = useState('44');
    const [image, setImage] = useState<string | null>(null);

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

        if (permissionResult.granted === false) {
            alert("من فضلك فعّل صلاحيات الوصول إلى الصور.");
            // ImagePicker.requestMediaLibraryPermissionsAsync();
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        // <View>
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
                    <View style={styles.pageTitle}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                            <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                        </TouchableOpacity>



                        <Text style={styles.pageTitleText}>
                            إضافة منتج جديد
                        </Text>
                        <View style={styles.dummyView} />

                        {/* <TouchableOpacity style={styles.iconButton} onPress={() =>
                        // setAddDelivery(true)

                        { }} >
                            <Icon name="add-circle-outline" size={scale(24)} color="#333" />
                        </TouchableOpacity> */}
                    </View>

                    {/*  */}

                    <Text style={{ marginTop: scale(5), fontFamily: 'Almarai', color: '#878787', fontSize: scale(12), fontWeight: 'bold', lineHeight: scale(20) }}>
                        يرجي التاكد من بيانات المنتج و عدم تكراره قبل الإضافة
                    </Text>

                    {/*  */}
                    <View style={{ width: '100%', }}>

                        {/* IMAGE SECTION */}
                        <TouchableOpacity
                            style={{ alignSelf: 'center', paddingVertical: scale(20), }}
                            onPress={pickImage}
                        >
                            {image ? (
                                <View style={{ alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: image }}
                                        style={{
                                            width: 110,
                                            height: 110,
                                            borderRadius: 55,
                                            borderWidth: 4,
                                            borderColor: '#0a7',
                                            shadowColor: '#000',
                                            shadowOffset: { width: 0, height: 2 },
                                            shadowOpacity: 0.25,
                                            shadowRadius: 8,
                                            marginBottom: 8,
                                        }}
                                        resizeMethod="resize"
                                        resizeMode="cover"
                                    />
                                    <TouchableOpacity
                                        onPress={() => setImage(null)}
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            right: 0,
                                            backgroundColor: '#fff',
                                            borderRadius: 12,
                                            padding: 2,
                                            borderWidth: 1,
                                            borderColor: '#eee',
                                            elevation: 2,
                                        }}
                                    >
                                        <Icon name="close-circle" size={24} color="#f44" />
                                    </TouchableOpacity>
                                    <Text style={{ color: '#888', fontFamily: 'Almarai', fontSize: 12, marginTop: 2 }}>تغيير الصورة</Text>
                                </View>
                            ) : (
                                <View style={{ alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: 110,
                                            height: 110,
                                            borderRadius: 55,
                                            backgroundColor: '#E6F0F0',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            borderWidth: 2,
                                            borderColor: '#036E65',
                                            marginBottom: 8,
                                        }}
                                    >
                                        <Icon name="camera-outline" size={40} color="#036E65" />
                                    </View>
                                    <Text style={{ color: '#036E65', lineHeight: scale(20), fontFamily: 'Almarai', textAlign: 'center', fontSize: 13 }}>
                                        من فضلك أضف صورة المنتج
                                        (اختياري)
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>

                        <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>اسم المنتج </Text>
                        <TextInput
                            style={styles.textInput}
                            value={name}
                            onChangeText={handleNameChange}
                            placeholder="اكتب اسم المنتج"
                            placeholderTextColor="#878787"
                        />


                        <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>سعر المنتج</Text>
                        <TextInput
                            style={styles.textInput}
                            value={price}
                            keyboardType="numeric"
                            onChangeText={handlePriceChange}
                            placeholder="اكتب السعر "
                            placeholderTextColor="#878787"
                        />


                        <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>الكمية</Text>
                        <TextInput
                            style={styles.textInput}
                            value={quantity}
                            keyboardType="numeric"
                            onChangeText={handleQuantityChange}
                            placeholder="اكتب الكمية "
                            placeholderTextColor="#878787"
                        />



                        {/* {error ? <Text style={styles.errorMessage}>{error}</Text> : null} */}

                    </View>

                    {/*  */}
                    <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: scale(10), justifyContent: 'center', alignItems: 'center', marginTop: scale(20), }}>

                        <TouchableOpacity
                            style={{ width: '100%', height: scale(50), backgroundColor: '#036E65', paddingVertical: scale(10), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center', }}
                            onPress={() => {
                                // Handle the add product action here
                                // console.log('Product added:', name);
                            }}>

                            <Text style={{ fontFamily: 'Almarai', color: '#fff', fontSize: scale(14), fontWeight: 'bold', textAlign: 'center', }}>
                                اضافة المنتج
                            </Text>
                        </TouchableOpacity>


                    </View>


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

    inputHeader: { fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: 'right', width: '100%', lineHeight: scale(20), color: '#333', },

    errorMessage: { fontSize: scale(12), fontFamily: 'Almarai', color: 'red', textAlign: 'left', width: '100%', marginTop: scale(4), lineHeight: scale(20), },

    textInput: { width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), textAlign: 'right', fontFamily: 'Almarai', fontSize: scale(12), },
})