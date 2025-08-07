import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { scale } from 'react-native-size-matters';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import RS from '@/assets/svg/RS';
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Product {
    id: number;
    title: string;
    price: number;
    imgUrls: string[];
    description: string;
}


const BestProductCard: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);


    const fetchProducts = async () => {
        try {
            const marketId = await AsyncStorage.getItem('marketId'); // ← غيّر المفتاح حسب تخزينك
            if (!marketId) {
                console.error('No market ID found');
                return;
            }

            const response = await axios.get(`http://192.168.1.11:5007/market/products/best-sales-row/${marketId}`);
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


    useEffect(() => {
        fetchProducts();
    }, []);



    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.cards}>
                    {products.map(product => (
                        <View key={product.id} style={[styles.card, {
                            borderColor: '#E5E5E5', borderWidth: scale(1),
                        }]}>
                            <TouchableOpacity onPress={async () => {
                                await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                router.push('/(routes)/market/home/products/ProductDetails');
                            }}>
                                <ImageBackground
                                    source={{ uri: product.imgUrls[0] }}
                                    style={styles.productImage}
                                    imageStyle={styles.imageStyle}
                                >
                                    <TouchableOpacity
                                        onPress={async () => {
                                            await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                            router.push('/(routes)/market/home/products/editProduct');
                                        }}
                                        style={styles.editIcon}
                                    >
                                        <MaterialCommunityIcon name="circle-edit-outline" size={scale(20)} color="#000" />
                                    </TouchableOpacity>
                                </ImageBackground>
                            </TouchableOpacity>

                            <View style={styles.bottomCard}>
                                <TouchableOpacity onPress={async () => {
                                    await AsyncStorage.setItem('selectedProductId', product.id.toString());
                                    router.push('/(routes)/market/home/products/ProductDetails');
                                }} style={styles.priceRow}>
                                    <View style={styles.priceBlock}>

                                        <RS />

                                        <Text
                                            // need to make the limit of text that will be viewed
                                            style={

                                                [styles.MarketDescription,
                                                {
                                                }
                                                ]}>{product.price}</Text>
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
        </View>
    );
};


export default BestProductCard;

const styles = StyleSheet.create({
    container: {
        marginTop: scale(12),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
        width: '100%',
    },
    cards: {
        flexDirection: 'row',
        gap: scale(8),
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(30),
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
    MarketDescription: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '700',
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
    cartInfoBox: {
        padding: scale(8),
        marginTop: scale(6), // MARK:- add margin to separate from the description
        backgroundColor: '#f8f9fa',
        borderRadius: scale(8),
        width: '100%',
        gap: scale(8),
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
    },
    addToCartBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        backgroundColor: '#f8f9fa',
        borderRadius: scale(8),
        marginTop: scale(8),
    },
    cartAddedText: {
        fontSize: scale(10),
        marginBottom: scale(4), // MARK:- add margin to separate from the description
        fontFamily: 'Almarai',
        fontWeight: '600',
        width: '100%',
        textAlign: 'center',
        color: '#A9A9A9',
    },
    quantityText: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '600',
        color: '#333',
    },
    productDescription: {
        fontSize: scale(11),
        fontFamily: 'Almarai',
        color: '#555',
        textAlign: 'right',
        marginVertical: scale(5),
    },
    quantityControlsBtn: {

        backgroundColor: 'transparent',
        borderRadius: "50%",
        width: scale(24),
        height: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#E5E5E5',
        borderWidth: scale(1),
        // padding: scale(4),

    },
});
