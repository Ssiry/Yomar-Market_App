import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { scale } from 'react-native-size-matters'
import RS from '@/assets/svg/RS'
import Icon from 'react-native-vector-icons/Ionicons'



interface Product {
    id: number;
    name: string;
    price: number;
    image: any;
    addToCart: boolean;
    numberOfItems: number;
    description: string;
    isFavorite?: boolean;
}


const createProducts = (count = 3): Product[] => {
    return Array.from({ length: count }, (_, index) => ({
        id: index + 1,
        name: `منتج رقم ${index + 1}`,
        price: Math.floor(Math.random() * 100) + 10,
        image: productImages[`product${index + 1}.jpg`],
        addToCart: false,
        numberOfItems: 1,
        description: 'وصف قصير للمنتج المحلي الطبيعي.',
        isFavorite: false,
    }));
};


const productImages: { [key: string]: any } = {
    'product1.jpg': require('@/assets/images/product1.jpg'),
    'product2.jpg': require('@/assets/images/product2.jpg'),
    'product3.jpg': require('@/assets/images/product3.jpg'),
};

const OrderItems = () => {
    const [products, setProducts] = useState<Product[]>(createProducts(3));

    const handleIncrement = (id: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, numberOfItems: product.numberOfItems + 1 } : product
            )
        );

    };

    const handleDecrement = (id: number) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id && product.numberOfItems > 1
                    ? { ...product, numberOfItems: product.numberOfItems - 1 }
                    : product
            )
        );

    };

    const updateProduct = useCallback((id: number, updates: Partial<Product>) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === id ? { ...product, ...updates } : product
            )
        );
    }, []);

    return (

        <View

            style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: scale(7),
                paddingVertical: scale(10),
            }}>

            {products.map(product => (

                <View
                    key={product.id}
                    style={{
                        width: '95%',
                        height: scale(80),
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: scale(10),
                        borderWidth: scale(1),
                        borderColor: '#E5E5E5',
                        borderRadius: scale(8),
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.10,
                        shadowRadius: 3.0,
                        elevation: 1,
                        gap: scale(10),


                    }}>
                    <TouchableOpacity
                        style={[styles.iconButton, { height: "100%", backgroundColor: '#e5e5e5' }]}
                        onPress={() => { }}>

                        <Icon name={'trash-bin'} size={scale(20)} color="#036E65" />
                    </TouchableOpacity>


                    <ImageBackground style={{
                        width: scale(60),
                        height: scale(60),
                        borderRadius: scale(8),
                        overflow: 'hidden',
                        backgroundColor: '#E5E5E5',
                    }} source={product.image} resizeMethod='resize'
                        key={product.id}

                        resizeMode='cover'
                        imageStyle={{
                            borderRadius: scale(8),
                            overflow: 'hidden',

                        }}
                    />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: scale(5),
                        height: '100%',
                        paddingVertical: scale(5),
                        paddingHorizontal: scale(10),

                    }}>
                        <View
                            style={styles.priceRow}>
                            <View style={styles.priceBlock}>
                                <RS />
                                <Text style={styles.MarketDescription}>37</Text>
                            </View>
                            <Text style={styles.MarketName}>منتج غذائي</Text>
                        </View>
                        {/* <View
                                    style={styles.priceRow}>
                                    <View style={styles.priceBlock}>
                                        <RS />
                                        <Text style={styles.MarketDescription}>37</Text>
                                    </View>
                                    <Text style={styles.MarketName}>منتج غذائي</Text>
                                </View> */}

                        <View style={styles.quantityRow}>
                            <View style={styles.quantityControls}>

                                {product.numberOfItems === 1 ?
                                    <TouchableOpacity style={[styles.quantityControlsBtn, { opacity: 0.5 }]}
                                        disabled={true}
                                    >
                                        <Icon name="remove" size={scale(16)} color="#036E65" />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.quantityControlsBtn} onPress={() => handleDecrement(product.id)}>
                                        <Icon name="remove" size={scale(16)} color="#036E65" />
                                    </TouchableOpacity>}
                                <Text style={styles.MarketDescription}>{product.numberOfItems}</Text>

                                {product.numberOfItems === 10 ?
                                    <TouchableOpacity style={[styles.quantityControlsBtn, { opacity: 0.5 }]}
                                        disabled={true}
                                    >
                                        <Icon name="add" size={scale(16)} color="#036E65" />
                                    </TouchableOpacity> : <TouchableOpacity style={styles.quantityControlsBtn} onPress={() => handleIncrement(product.id)}>
                                        <Icon name="add" size={scale(16)} color="#036E65" />
                                    </TouchableOpacity>}
                            </View>
                            <Text style={styles.quantityText}> العدد</Text>
                        </View>


                    </View>
                </View>
            ))}

        </View>
    )
}

export default OrderItems

const styles = StyleSheet.create({

    iconButton: {
        backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center',
    },
    // card styles
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '75%',

        // backgroundColor: 'red'


    },
    priceBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(2),
    },

    MarketName: {
        fontSize: scale(12),
        fontWeight: '700',
        fontFamily: 'Almarai',
        color: '#046132',
        textAlign: 'right',
        // width: '100%',
    },
    MarketDescription: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '700',
        color: '#046132',
        textAlign: 'right',

    },
    quantityRow: {
        flexDirection: 'row',
        width: '75%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(5),
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

    },
    quantityText: {
        fontSize: scale(12),
        fontFamily: 'Almarai',
        fontWeight: '600',
        color: '#333',
        textAlign: 'right',
    },
})