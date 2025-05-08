import { Platform, ScrollView, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import NavBar from './NavBar'
import { scale } from 'react-native-size-matters'
import * as Location from 'expo-location';

import ProductImageCarousel from './ProductImageCarousel'
import Title from './title'
import Description from './Description'
import Review from './Review'
import AddToCard from './addToCard'
import BgPattern from '@/assets/svg/Pattern'



const index = () => {

    const [visible, setVisible] = useState(false);


    // move it to all cases for all screens in main index for (routes)
    useEffect(() => {
        const handlePermissions = async () => {
            if (Platform.OS === 'android') {
                await requestLocationPermission();
            } else {
                await checkLocationPermission();
            }
        };

        handlePermissions();
    }, []);


    async function requestLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('تم رفض إذن الوصول للموقع');

        } else {
            console.log('تم السماح بالوصول إلى الموقع');
        }
    }

    async function checkLocationPermission() {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('access denied');
            setVisible(true);

        } else {
            console.log('access granted');
            const location = await Location.getCurrentPositionAsync({});
            console.log('Current location:', location);
            setVisible(false);
        }
    }
    return (
        <SafeAreaView style={styles.safeContainer}>

            <BgPattern style={{ position: 'absolute', top: scale(-100), left: scale(-50), opacity: 0.3 }} />

            <ScrollView horizontal={false} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} bounces>
                <View style={styles.cards}>

                    <NavBar />
                    <ProductImageCarousel />
                    <Title />
                    <Description />
                    <Review />

                </View>
            </ScrollView>
            <View style={{
                paddingHorizontal: scale(27),
                position: 'absolute', bottom: 0, width: '120%', height: scale(100), backgroundColor: '#fff', borderRadius: scale(8), justifyContent: "space-between", alignItems: 'flex-start',
                padding: scale(16),
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0.20,
                shadowRadius: 3.84,
                elevation: 5,

            }}>
                {/* add to card */}
                <AddToCard />


                {/* add to card */}
            </View>
        </SafeAreaView>
    )
}

export default index

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
    cards: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: scale(-30),
        width: '100%',
        gap: scale(12),
    },

})
