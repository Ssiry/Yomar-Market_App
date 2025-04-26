import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '@/components/elements/Banner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import NavBar from '@/components/elements/NavBar';
import FeaturedMarkets from '@/components/elements/FeaturedMarkets';
import CategoryBar from '@/components/elements/CategoryBar';
import BgPattern from '@/assets/svg/Pattern';
import MyMap from '@/components/elements/mapView';
import { router } from 'expo-router';


const Main = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* nav-bar header */}
                <NavBar />

                {/* banner */}
                <Banner />

                {/* category bar */}
                {/* <CategoryBar /> */}

                {/* see all markets */}
                <View style={styles.pageTitle}>
                    <View style={{
                        // backgroundColor: '#E5E5E5',
                        // borderRadius: scale(8),
                        padding: scale(4),
                        // width: scale(36),
                        height: scale(36),
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'center',
                        gap: scale(6),
                        alignItems: 'center',

                    }}>

                        <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" }}>
                            كُل المحلات
                        </Text>
                        <TouchableOpacity
                            style={styles.iconButton}

                            onPress={() => { router.push("/(routes)/Markets/AllMarkets") }}>
                            <Icon name="arrow-forward-ios" size={scale(14)} color="#036E65" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#036E65', fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                        اقرب المحلات
                    </Text>
                </View>

                {/* nearest Markets */}
                <View style={{ marginBottom: scale(14) }}>
                    <FeaturedMarkets />
                </View>

                {/* Navigate to MAIM MAP */}
                <View style={styles.pageTitle}>
                    <Text style={{ color: "#036E65", fontFamily: 'Almarai', fontSize: scale(10), fontWeight: 'bold', lineHeight: scale(20) }}>

                        اضغط علي الايقونة لتصفح جميع المحلات بجوارك

                    </Text>



                    <TouchableOpacity
                        style={styles.iconButton}

                        onPress={() => { router.push('/(routes)/Markets') }}>
                        <Icon2 name="map-search" size={scale(24)} color="#036E65" />
                    </TouchableOpacity>


                </View>

                {/* mini map view */}
                {/* <View style={{ marginVertical: scale(12), height: scale(200), backgroundColor: "red", borderRadius: scale(8) }}>

                </View> */}
                <MyMap />

            </ScrollView>
        </SafeAreaView>
    );
};

export default Main;

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
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },

    categoryBar: {
        width: '100%',
        height: scale(50),
        marginTop: scale(-10),
        // paddingHorizontal: scale(4),
        borderRadius: scale(100),
    },
    categoryBarContent: {
        display: "flex",
        flexDirection: "row",
        // justifyContent: "flex-end",
        alignItems: "center",
        height: scale(50),
        backgroundColor: "#036E65",
        paddingHorizontal: scale(6),

    },
    categoryItemSelected: {
        backgroundColor: "#FED90E",
        width: scale(100),
        height: scale(34),
        marginHorizontal: scale(2),
        borderRadius: scale(100),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    categoryItem: {
        // backgroundColor: "#FED90E",
        width: scale(70),
        height: scale(34),
        marginHorizontal: scale(2),
        borderRadius: scale(100),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    categoryItemTextSelected: {
        fontFamily: "Almarai",
        fontSize: scale(12),
        fontWeight: "700",
        color: "#036E65",
        textAlign: "center",
        textAlignVertical: "center",
    },

    categoryItemText: {
        fontFamily: "Almarai",
        fontSize: scale(12),
        fontWeight: "700",
        color: "#FED90E",
        textAlign: "center",
        textAlignVertical: "center",

    },
    pageTitle: {
        paddingVertical: scale(5),
        borderBottomColor: "#036E65", borderTopColor: "#036E65", borderWidth: scale(1), borderRightWidth: (0), borderLeftWidth: scale(0),
        width: "100%", height: scale(50), justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row-reverse",
        // marginTop: scale(0)
    },
});
