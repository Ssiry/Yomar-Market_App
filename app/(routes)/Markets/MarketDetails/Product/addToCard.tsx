import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons'

const AddToCard = () => {
    const [count, setCount] = useState(1)

    const increment = () => setCount(prev => prev + 1)
    const decrement = () => setCount(prev => (prev > 0 ? prev - 1 : 0))

    const handleAddToCart = () => {
        // Handle adding to cart logic here
        console.log('Added to cart:', setCount(1))


    }
    const handleDeleteFromCart = () => {
        // Handle removing from cart logic here
        console.log('Removed from cart:', setCount(0))

    }

    return (
        <View style={styles.container}>
            {/* Add or Remove from Cart Button */}
            {count <= 0 ? (
                <TouchableOpacity
                    onPress={() => handleAddToCart()}
                    style={[styles.cartButton, { backgroundColor: '#cdcdcd' }]}>
                    <Icon name='add-shopping-cart' size={scale(16)} color="#000" />
                    <Text style={[styles.cartText, { color: "#000" }]}>اضف الى السلة</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={() => handleDeleteFromCart()}
                    style={[styles.cartButton]}>
                    <Icon name='delete' size={scale(16)} color="#fff" />
                    <Text style={styles.cartText}>تاكيد الطلب</Text>
                </TouchableOpacity>
            )}

            {/* Quantity Controller */}
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={decrement} style={styles.circleBtn}>
                    <Icon name='remove' size={scale(24)} color="#000" />
                </TouchableOpacity>

                <Text style={styles.countText}>{count}</Text>

                <TouchableOpacity onPress={increment} style={styles.circleBtn}>
                    <Icon name='add' size={scale(24)} color="#000" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AddToCard

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row-reverse',
        gap: scale(12),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#036E65',
        padding: scale(16),
        paddingHorizontal: scale(30),
        gap: scale(5),
        borderRadius: scale(100),
    },
    cartText: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        fontWeight: '800',
        color: '#fff',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },
    circleBtn: {
        padding: scale(8),
        backgroundColor: '#fff',
        borderRadius: scale(50),
        borderColor: '#eaeaea',
        borderWidth: scale(1),
        justifyContent: 'center',
        alignItems: 'center',
    },
    countText: {
        fontFamily: 'Almarai',
        fontSize: scale(20),
        fontWeight: '800',
    },
})
