import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Dimensions,
    Animated,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'

const markerData = [
    {
        id: 1,
        title: 'تموينات الراعي',
        description: 'ألبان ومواد غذائية',
        coordinate: { latitude: 26.5593, longitude: 31.6956 },
        image: require('@/assets/images/Background.png'),
        rate: 3.5
    },
    {
        id: 2,
        title: 'تموينات المدينة',
        description: 'خضروات وفواكه',
        coordinate: { latitude: 26.5605, longitude: 31.698 },
        image: require('@/assets/images/Background.png'),
        rate: 4.0
    },
    {
        id: 3,
        title: 'أسواق الخير',
        description: 'عطارة ومنتجات محلية',
        coordinate: { latitude: 26.5610, longitude: 31.6922 },
        image: require('@/assets/images/Background.png'),
        rate: 4.5
    },
    {
        id: 4,
        title: 'تموينات البركة',
        description: 'لحوم طازجة ومجمدة',
        coordinate: { latitude: 26.5631, longitude: 31.6965 },
        image: require('@/assets/images/Background.png'),
        rate: 2.5
    },
    {
        id: 5,
        title: 'ماركت الريف',
        description: 'خبز ومخبوزات',
        coordinate: { latitude: 26.5581, longitude: 31.6990 },
        image: require('@/assets/images/Background.png'),
        rate: 3.0
    },
    {
        id: 6,
        title: 'تموينات العاصمة',
        description: 'منظفات وورقيات',
        coordinate: { latitude: 26.5627, longitude: 31.6943 },
        image: require('@/assets/images/Background.png'),
        rate: 4.0
    },
    {
        id: 7,
        title: 'أسواق السلطان',
        description: 'أطعمة مجمدة ومواد تموينية',
        coordinate: { latitude: 26.5575, longitude: 31.6972 },
        image: require('@/assets/images/Background.png'),
        rate: 3.8
    },
    {
        id: 8,
        title: 'ماركت الفجر',
        description: 'مستلزمات يومية',
        coordinate: { latitude: 26.5618, longitude: 31.6931 },
        image: require('@/assets/images/Background.png'),
        rate: 4.2
    },
    {
        id: 9,
        title: 'سوبر ماركت الحمد',
        description: 'خضروات وفواكه طازجة',
        coordinate: { latitude: 26.5599, longitude: 31.6968 },
        image: require('@/assets/images/Background.png'),
        rate: 3.9
    },
    {
        id: 10,
        title: 'ماركت الهدى',
        description: 'منتجات عضوية ومحلية',
        coordinate: { latitude: 26.5644, longitude: 31.6952 },
        image: require('@/assets/images/Background.png'),
        rate: 4.7
    },
];

export default function MarketsMap() {
    const [selectedMarker, setSelectedMarker] = useState<typeof markerData[0] | null>(null);
    const slideAnim = useRef(new Animated.Value(300)).current;

    const showCard = (marker: typeof markerData[0]) => {
        setSelectedMarker(marker);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const hideCard = () => {
        Animated.timing(slideAnim, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
        }).start(() => {
            setSelectedMarker(null);
        });
    };

    return (
        <View style={styles.container}>
            {/* page title & back btn */}
            <View style={styles.pageTitle}>
                <TouchableOpacity
                    style={styles.iconButton}
                    onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={[styles.title, { fontFamily: 'Almarai', marginLeft: scale(20), textAlign: "center", fontSize: scale(16), fontWeight: 'bold' }]}>

                    المحلات القريبة

                </Text>
                <View style={{ width: scale(40) }} />
            </View>


            {/* Map View */}
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 26.5593,
                    longitude: 31.6956,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                {markerData.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        onPress={() => showCard(marker)}
                    >
                        <Image
                            source={marker.image}
                            style={styles.markerImage}
                            resizeMode="cover"
                        />
                    </Marker>
                ))}
            </MapView>

            {selectedMarker && (
                <Animated.View style={[styles.cardContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <View style={styles.cardHeader}>

                        <Image source={selectedMarker.image} style={styles.cardImage} />

                        <View style={styles.cardContent}>
                            <View style={styles.RContent1}>
                                <Text style={styles.cardTitle}>{selectedMarker.title}</Text>
                                <Text style={styles.cardDesc}>{selectedMarker.description}</Text>
                            </View>

                            // R Content 2
                            <View style={styles.RContent2}>
                                <Text style={{ fontFamily: "Almarai", color: '#036E65', fontWeight: '700', fontSize: scale(18), marginLeft: scale(3) }}>{selectedMarker.rate}</Text>
                                <View style={{ flexDirection: 'row', gap: scale(1) }}>
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const fullStars = Math.floor(selectedMarker.rate);
                                        const hasHalfStar = selectedMarker.rate - fullStars >= 0.5;

                                        let iconName = 'star-outline';
                                        if (index < fullStars) {
                                            iconName = 'star';
                                        } else if (index === fullStars && hasHalfStar) {
                                            iconName = 'star-half';
                                        }

                                        return (
                                            <Icon
                                                key={index}
                                                name={iconName}
                                                size={scale(14)}
                                                color="#036E65"
                                            />
                                        );
                                    })}
                                </View>



                            </View>


                            <View style={styles.RContent3}>

                                <View style={styles.bottomView}>
                                    <Text style={{ fontFamily: "Almarai", fontSize: scale(10), color: "#4F9993" }}>

                                        المسافة

                                    </Text>
                                    <Text style={{ fontFamily: "Almarai", fontWeight: "700", fontSize: scale(18), color: "#036E65" }}>
                                        1.6 Km
                                    </Text>
                                </View>

                                <View style={styles.bottomView}>
                                    <Text style={{ fontFamily: "Almarai", fontSize: scale(10), color: "#4F9993" }}>وقت التوصيل</Text>
                                    <Text style={{ fontFamily: "Almarai", fontWeight: "700", fontSize: scale(18), color: "#036E65" }}>5 min</Text>
                                </View>

                            </View>

                        </View>



                        <TouchableOpacity
                            style={styles.closeTextContainer}
                            onPress={hideCard}>
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        // onPress={handleSubmit}
                        style={{
                            width: '100%',
                            height: scale(48),
                            backgroundColor: "#036E65",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: scale(100),
                            marginTop: scale(16),
                        }}
                    >
                        <Text
                            style={{ fontFamily: 'Almarai', fontSize: scale(14), fontWeight: 'bold', color: '#fff' }}>
                            تسوق الآن

                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            )}



        </View>
    );
}

// Removed unused variable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    }, pageTitle: {

        width: "100%", height: scale(40), justifyContent: "space-between", alignItems: "center", position: "absolute", top: scale(30), zIndex: 1, display: "flex", flexDirection: "row", marginTop: scale(24), paddingHorizontal: scale(20)
    },
    map: {
        flex: 1,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#036E65',
    },
    cardContainer: {
        position: 'absolute',

        bottom: scale(20),
        // width: "100%",
        padding: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },



        // its content
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center',

    },

    //Bottom Content
    submitBtn: {

    },

    // Top Content
    cardHeader: {

        backgroundColor: '#fff',
        padding: scale(14),
        borderRadius: scale(16),


        // for its content 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },

    cardImage: {
        width: "40%", height: scale(160), borderRadius: scale(12),
    },


    // the Right
    // main of R View
    cardContent: {
        display: 'flex', flexDirection: 'column', justifyContent: "flex-end", alignItems: 'flex-end', width: "60%", gap: scale(8)
    },



    // 1
    RContent1: {
        display: 'flex', flexDirection: 'column', justifyContent: "flex-end", alignItems: 'flex-end', width: "100%",
    },

    cardTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#036E65',
        marginBottom: 4,
        fontFamily: 'Almarai',
    },

    cardDesc: {

        fontSize: 13,
        color: '#4F9993',
        fontFamily: 'Almarai',

    },

    RContent2: {
        width: "60%", height: scale(35), display: 'flex', flexDirection: "row", alignContent: 'center', justifyContent: 'space-between', alignItems: 'center'
    },
    RContent3: {
        width: "80%", display: 'flex', flexDirection: "row", alignContent: 'center', justifyContent: 'space-between', alignItems: 'center'
    },

    bottomView: {
        display: 'flex', flexDirection: "column", justifyContent: "space-between", alignItems: 'center', width: "40%", gap: scale(4)
    },

    cardButton: {
        backgroundColor: '#036E65', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8,
    },

    cardButtonText: {
        color: '#fff', fontSize: 12, fontFamily: 'Almarai', textAlign: "right",
    },

    // close button
    closeTextContainer: {
        position: 'absolute',
        top: scale(22),
        left: scale(22),
        backgroundColor: '#E5E5E5',
        opacity: 0.8,
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#444',

    },

    // back button
    iconButton: {
        backgroundColor: '#E5E5E5',
        opacity: 0.8,
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        backgroundColor: '#E5E5E5',
        opacity: 0.8,
        borderRadius: scale(8),
        padding: scale(8),
        paddingHorizontal: scale(14),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',

    }
});
