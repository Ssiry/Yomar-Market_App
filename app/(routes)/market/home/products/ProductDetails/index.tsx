import { ActivityIndicator, Platform, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from './NavBar'
import { scale } from 'react-native-size-matters'
import * as Location from 'expo-location';

import ProductImageCarousel from './ProductImageCarousel'
import Title from './title'
import Description from './Description'
// import Review from './Review'
// import AddToCard from './addToCard'
import BgPattern from '@/assets/svg/Pattern'
import DeleteProductModal from './deleteProduct'
import { router, useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


// // move it to all cases for all screens in main index for (routes)
// useEffect(() => {
//     const handlePermissions = async () => {
//         if (Platform.OS === 'android') {
//             await requestLocationPermission();
//         } else {
//             await checkLocationPermission();
//         }
//     };

//     handlePermissions();
// }, []);
// async function requestLocationPermission() {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status !== 'granted') {
//         console.log('تم رفض إذن الوصول للموقع');

//     } else {
//         console.log('تم السماح بالوصول إلى الموقع');
//     }
// }

// async function checkLocationPermission() {
//     const { status } = await Location.getForegroundPermissionsAsync();
//     if (status !== 'granted') {
//         console.log('access denied');
//         setVisible(true);

//     } else {
//         console.log('access granted');
//         const location = await Location.getCurrentPositionAsync({});
//         console.log('Current location:', location);
//         setVisible(false);
//     }
// }


interface Product {
    id: number;
    title: string;
    price: number;
    imgUrls: string[];
    description: string;
    quantity: number;
}

const index = () => {
    const [deleteProduct, setDeleteProduct] = useState(false);


    // const { productId } = useLocalSearchParams();
    const [id, setId] = useState<number | null>(); // استخدام id بدلاً من productId
    // const { id } = route.params; // تأكد أنك أرسلت ID عند التنقل لهذه الشاشة

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [product, setProduct] = useState<Product>();
    const API_BASE_URL = 'http://192.168.1.11:5007/market/products/product'; // غيّر IP لو لازم


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
                        setProduct(data);
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

            <BgPattern style={{ position: 'absolute', top: scale(-100), left: scale(-50), opacity: 0.3 }} />

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} bounces>

                <View style={styles.cards}>

                    <View style={styles.view1}>
                        <NavBar />

                        {loading ? (
                            <ActivityIndicator size="large" color="#000" />
                        ) : (
                            <View style={styles.view2}>
                                <ProductImageCarousel data={product?.imgUrls || []} />
                                <Title title={product?.title || ''} price={product?.price || 0} quantity={product?.quantity || 0}

                                />
                                <Description description={product?.description || ''} />
                            </View>
                        )}
                    </View>



                </View>
            </ScrollView>

            <DeleteProductModal visible={deleteProduct}
                onConfirm={() => {
                    // setVisible(false);
                    setDeleteProduct(false);
                }}
                onCancel={() => {
                    // setVisible(false);
                    setDeleteProduct(false);
                }} />


        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: {
        width: '100%',
        flex: 1, justifyContent: "flex-start", alignItems: 'center',
        paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30)
    },
    cards: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(-30),
        width: '100%',
        gap: scale(12),
    },
    view1: {
        width: '100%',
        gap: scale(12),
        flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'
    },
    view2: {
        gap: scale(12),
        width: '100%',
        flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%'
    }

})
