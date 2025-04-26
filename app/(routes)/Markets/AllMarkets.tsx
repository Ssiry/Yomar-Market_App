import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '@/components/elements/NavBar'
import { scale } from 'react-native-size-matters'
import { router } from 'expo-router';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import CategoryBar from '@/components/elements/CategoryBar';
import MarketCard from '@/components/elements/MarketCard';


const AllMarkets = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                <NavBar />

                {/* navigate on map */}
                {/* Navigate to MAIM MAP */}
                <View style={styles.pageTitle}>

                    <Text style={{ color: "#036E65", fontFamily: 'Almarai', fontSize: scale(10), fontWeight: 'bold', lineHeight: scale(20) }}>

                        اضغط علي الايقونة لتصفح جميع المحلات بجوارك

                    </Text>



                    <TouchableOpacity
                        style={styles.iconButton}

                        onPress={() => { router.push('/(routes)/Markets/MarketsMap') }}>
                        <Icon2 name="map-search" size={scale(24)} color="#036E65" />
                    </TouchableOpacity>


                </View>

                <CategoryBar />

                {/* scroll to see all */}
                <MarketCard />
                {/* <View style={{ height: scale(50) }}> */}

                {/* </View> */}


            </ScrollView>
        </SafeAreaView>
    )
}

export default AllMarkets

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
        marginBottom: scale(-30)
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
        borderBottomColor: "#036E65", borderTopColor: "#036E65", borderWidth: scale(1), borderRightWidth: (0), borderLeftWidth: scale(0),
        width: "100%", height: scale(50), justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row-reverse",
        // marginTop: scale(0)
    },
})