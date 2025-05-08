import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import ProductCard from '@/components/elements/ProductCard'
import MarketCard from '@/components/elements/MarketCard'

const categories = ['الاماكن', 'المنتجات'];

const Favourite = () => {
    const [categorytype, setCategorytype] = useState("المنتجات");

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
            >
                {/* Header */}
                <View style={styles.pageTitle}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>

                    <Text style={styles.pageTitleText}>
                        المفضلة
                    </Text>

                    <View style={styles.dummyView} />
                </View>

                {/* Category Switcher */}
                <View style={styles.container}>
                    {categories.map((item, index) => {
                        const isSelected = categorytype !== item;
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCategorytype(item)}
                                style={[
                                    styles.innerItem,
                                    { backgroundColor: isSelected ? 'transparent' : '#FED90E' },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.text,
                                        { color: isSelected ? '#FED90E' : '#036E65' },
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* Conditional Display */}
                <View style={{ width: '100%' }}>
                    {categorytype === 'المنتجات' ? (
                        <View>
                            <ProductCard />
                        </View>
                    ) : (
                        <View>
                            <MarketCard />
                        </View>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Favourite

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30),
    },
    scrollcontent: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
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
        fontWeight: 'bold'
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
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    innerItem: {
        width: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        height: scale(37),
        borderRadius: scale(100),
    },
    text: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'capitalize',
        lineHeight: scale(22),
    },
    container: {
        backgroundColor: '#036E65',
        borderRadius: scale(100),
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: scale(12),
        marginVertical: scale(20),
        paddingVertical: scale(10),
    },
})
