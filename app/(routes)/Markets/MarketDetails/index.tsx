import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters';
// import Banner from '@/components/elements/Banner';
// import Icon from 'react-native-vector-icons/AntDesign';
// import Ionic from 'react-native-vector-icons/Ionicons';
// import Awesome6Icon from 'react-native-vector-icons/FontAwesome5';
// import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
// import { router } from 'expo-router';
import NavBar from './NavBar';
import AboutCard from './AboutCard';
import CategoryBar from '@/components/elements/CategoryBar';
import ProductCard from '@/components/elements/ProductCard';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

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