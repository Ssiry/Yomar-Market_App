import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters';

import NavBar from './NavBar';
import AboutCard from './AboutCard';
import CategoryBar from '@/components/elements/CategoryBar';
import ProductCard from '@/components/elements/ProductCard';


const MarketDetails = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* NaVBar */}
                <NavBar />

                {/* About card */}
                <AboutCard />

                {/* category  */}
                <CategoryBar />

                {/* Products */}
                <ProductCard />


            </ScrollView>
        </SafeAreaView>
    )
}

export default MarketDetails

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1, justifyContent: "flex-start", alignItems: 'center',
        paddingHorizontal: scale(24), backgroundColor: "#fff"
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30)
    },
})