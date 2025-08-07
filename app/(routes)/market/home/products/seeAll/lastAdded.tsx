import { ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import RS from '@/assets/svg/RS';
import { router } from 'expo-router';


// import NavBar from './NavBar';
import BgPattern from '@/assets/svg/Pattern';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
    // image: any;
    id: number;
    title: string;
    price: number;
    imgUrls: string[];
    description: string;
}



const Latest = () => {

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchProducts = async () => {
        try {
            setLoading(true)
            const marketId = await AsyncStorage.getItem('marketId'); // ← غيّر المفتاح حسب تخزينك
            if (!marketId) {
                console.error('No market ID found');
                return;
            }

            const response = await axios.get(`http://192.168.1.11:5007/market/products/latest/${marketId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {

        fetchProducts();
    }, []);



    // const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
    //     setProducts(prevProducts =>
    //         prevProducts.map(product =>
    //             product.id === id ? { ...product, ...updates } : product
    //         )
    //     );
    // }, []);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            {loading ? (
                <Text>loading...</Text>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} bounces >




                    <View style={styles.cards}>
                        <View style={styles.pageTitle}>

                            <View style={styles.dummyView} />

                            <Text style={styles.pageTitleText}>
                                المنتجات المضافة مؤخراً
                            </Text>
                            <TouchableOpacity style={styles.iconButton}
                                onPress={() => {
                                    router.back();
                                }}
                            >
                                <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                            </TouchableOpacity>


                        </View>


                        {(products ?? []).map(product => (
                            <View key={product.id} style={[styles.card, {
                                borderColor: '#E5E5E5', borderWidth: scale(1),
                            }]}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                    router.push('/(routes)/market/home/products/ProductDetails');
                                }}>
                                    <ImageBackground
                                        source={product.imgUrls[0] ? { uri: product.imgUrls[0] } : undefined}
                                        style={styles.productImage}
                                        imageStyle={styles.imageStyle}

                                    >
                                        <TouchableOpacity
                                            onPress={async () => {
                                                await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                                router.push('/(routes)/market/home/products/editProduct');
                                            }} style={styles.editIcon}>
                                            <MaterialCommunityIcon name="circle-edit-outline" size={scale(20)} color="#000" />
                                        </TouchableOpacity>

                                    </ImageBackground>
                                </TouchableOpacity>


                                <View style={styles.bottomCard}>
                                    <TouchableOpacity onPress={async () => {
                                        await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                        router.push('/(routes)/market/home/products/ProductDetails');
                                    }}
                                        style={styles.priceRow}>
                                        <View style={styles.priceBlock}>
                                            <RS />
                                            <Text style={styles.MarketDescription}>{product.price}</Text>
                                        </View>
                                        <Text style={styles.MarketName}>{product.title}</Text>
                                    </TouchableOpacity>

                                    <View style={styles.infoArea}>
                                        <Text style={[{ width: '100%' }, styles.productDescription]}>
                                            {product.description.length > 40
                                                ? product.description.substring(0, 40) + '...'
                                                : product.description}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                </ScrollView>
            )}

        </SafeAreaView>
    )
}

export default Latest

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(18),
        backgroundColor: '#fff',

    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30),
        paddingBottom: scale(20),
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        // marginTop:scale(8)
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(32),
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {

        paddingVertical: scale(5),
        borderBottomColor: "#036E65", borderTopColor: "#036E65", borderWidth: scale(0), borderRightWidth: (0), borderLeftWidth: scale(0),
        width: "100%", height: scale(50), justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row-reverse",
        // marginTop: scale(0)
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

    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: scale(14),
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: scale(30),
        padding: scale(12),

    },
    card: {
        backgroundColor: '#C8DFDD',
        width: scale(155),
        borderRadius: scale(13),
        padding: scale(8),
        borderWidth: scale(1),
        // marginBottom: scale(10),
        gap: scale(8),
    },

    productImage: {
        width: '100%',
        aspectRatio: 1,
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        borderRadius: scale(7),
        resizeMode: 'cover',
    },

    editIcon: {
        position: 'absolute',
        top: scale(6),
        left: scale(6),
        backgroundColor: '#fff',
        width: scale(24),
        height: scale(24),
        borderRadius: scale(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomCard: {
        padding: scale(4),
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: scale(6),
    },
    MarketName: {
        fontSize: scale(12),
        fontWeight: '700',
        fontFamily: 'Almarai',
        color: '#046132',
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(2),
    },
    infoArea: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
    },
    MarketDescription: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '700',
        color: '#046132',
    },
    productDescription: {
        fontSize: scale(11),
        fontFamily: 'Almarai',
        color: '#555',
        textAlign: 'right',
        marginVertical: scale(5),
    },
})