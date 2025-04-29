import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import RS from '@/assets/svg/RS';

const generateProducts = (count = 10) => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: `منتج رقم ${index + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        image: require('@/assets/images/product.png'),
        addToCart: false,
        numberOfItems: 1,
        description: 'وصف قصير للمنتج المحلي الطبيعي.',
    }));
};

const ProductCard = () => {
    const [products, setProducts] = useState(generateProducts(10));


    const handleAddToCart = (id: number) => {
        const updatedProducts = products.map(product =>
            product.id === id ? { ...product, addToCart: true } : product
        );
        setProducts(updatedProducts);
    };

    const handleIncrement = (id: number) => {
        const updatedProducts = products.map(product =>
            product.id === id ? { ...product, numberOfItems: product.numberOfItems + 1 } : product
        );
        setProducts(updatedProducts);
    };

    const handleDecrement = (id: number) => {
        const updatedProducts = products.map(product =>
            product.id === id && product.numberOfItems > 1
                ? { ...product, numberOfItems: product.numberOfItems - 1 }
                : product
        );
        setProducts(updatedProducts);
    };

    return (
        <View style={styles.container}>
            <ScrollView showsHorizontalScrollIndicator={false} bounces>
                <View style={styles.cards}>
                    {products.map((product) => (
                        <View key={product.id} style={styles.card}>
                            <ImageBackground
                                source={product.image}
                                style={{ width: '100%', aspectRatio: 1 }}
                                imageStyle={{
                                    width: 'auto',
                                    height: 'auto',
                                    borderRadius: scale(7),
                                    resizeMode: 'cover',
                                }}
                            >
                                <View style={styles.favoriteIcon}>
                                    <TouchableOpacity>
                                        <Icon name='heart-outline' size={scale(22)} color="#000" />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>

                            <View style={styles.bottomCard}>
                                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                                    <View style={styles.priceRow}>
                                        <View style={styles.priceBlock}>
                                            <RS />
                                            <Text style={styles.MarketDescription}>{product.price}</Text>
                                        </View>
                                        <Text style={styles.MarketName}>{product.name}</Text>
                                    </View>
                                </View>

                                <View style={styles.infoArea}>
                                    {product.addToCart ? (
                                        <View style={styles.cartInfoBox}>
                                            <Text>تم الاضافة الي السلة</Text>
                                            <View style={styles.quantityRow}>
                                                <View style={styles.quantityControls}>
                                                    <TouchableOpacity onPress={() => handleDecrement(product.id)}>
                                                        <Icon name='remove' size={scale(12)} color="#036E65" />
                                                    </TouchableOpacity>
                                                    <Text style={styles.MarketDescription}>
                                                        {product.numberOfItems}
                                                    </Text>
                                                    <TouchableOpacity onPress={() => handleIncrement(product.id)}>
                                                        <Icon name='add' size={scale(12)} color="#036E65" />
                                                    </TouchableOpacity>
                                                </View>
                                                <Text>عدد العناصر</Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={{ width: '100%' }}>
                                            <Text>{product.description}</Text>
                                            <TouchableOpacity
                                                style={styles.addToCartBtn}
                                                onPress={() => handleAddToCart(product.id)}
                                            >
                                                <Icon name='cart' size={scale(12)} color="#036E65" />
                                                <Text style={styles.MarketName}>أضف الي السلة</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default ProductCard;

const styles = StyleSheet.create({
    container: {
        marginTop: scale(5),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
        width: '100%',
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    card: {
        backgroundColor: '#C8DFDD',
        width: scale(145),
        maxWidth: scale(200),
        minHeight: scale(205),
        borderRadius: scale(13),
        padding: scale(8),
        borderColor: '#E5E5E5',
        borderWidth: scale(1),
        gap: scale(8),
        marginBottom: scale(10),
    },
    favoriteIcon: {
        backgroundColor: 'white',
        position: 'absolute',
        top: scale(6),
        left: scale(6),
        width: scale(24),
        height: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(3),
    },
    bottomCard: {
        padding: scale(2),
        backgroundColor: 'transparent',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        gap: scale(5),
    },
    MarketName: {
        lineHeight: scale(20),
        fontSize: scale(12),
        fontWeight: '700',
        fontFamily: 'Almarai',
        color: '#046132',
    },
    MarketDescription: {
        lineHeight: scale(20),
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
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        backgroundColor: '#f8f9fa',
        borderRadius: scale(8),
        width: '100%',
    },
    quantityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(2),
    },
    addToCartBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: scale(5),
        paddingHorizontal: scale(10),
        backgroundColor: '#f8f9fa',
        borderRadius: scale(8),
        marginTop: scale(5),
    },
});
