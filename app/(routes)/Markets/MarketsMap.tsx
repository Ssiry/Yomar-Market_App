import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    Animated,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';
import * as Location from 'expo-location';

const markerData = [
    {
        id: 1,
        title: 'تموينات الراعي',
        description: 'ألبان ومواد غذائية',
        coordinate: { latitude: 24.0889, longitude: 32.8980 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 3.5,
    },
    {
        id: 2,
        title: 'مقهى القهوة',
        description: 'أفضل أنواع القهوة',
        coordinate: { latitude: 24.0900, longitude: 32.9020 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 4.0,
    },
    {
        id: 3,
        title: 'مطعم العائلة',
        description: 'وجبات عائلية لذيذة',
        coordinate: { latitude: 24.0930, longitude: 32.9000 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 4.2,
    },
    {
        id: 4,
        title: 'محل الحرف اليدوية',
        description: 'منتجات يدوية مميزة',
        coordinate: { latitude: 24.0950, longitude: 32.9030 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 4.5,
    },
    {
        id: 5,
        title: 'سوبر ماركت المدينة',
        description: 'كل ما تحتاجه من المواد الغذائية',
        coordinate: { latitude: 24.0920, longitude: 32.9045 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 4.1,
    },
    {
        id: 6,
        title: 'مكتبة الثقافة',
        description: 'كتب تعليمية وثقافية',
        coordinate: { latitude: 24.0940, longitude: 32.9050 }, // Aswan coordinates
        image: require('@/assets/images/Background.png'), // Dummy image path
        rate: 3.8,
    },
    // Add more data points as necessary
];


export default function MarketsMap() {
    const [selectedMarker, setSelectedMarker] = useState<null | (typeof markerData)[0]>(null);
    const [userLocation, setUserLocation] = useState<null | Location.LocationObjectCoords>(null);
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        // Get user location on mount
        const getLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        };
        getLocation();
    }, []);

    const showCard = (marker: (typeof markerData)[0]) => {
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
                region={
                    userLocation
                        ? {
                            latitude: userLocation?.latitude,
                            longitude: userLocation?.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }
                        : {
                            latitude: 26.5593,
                            longitude: 31.6956,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }
                }
                showsMyLocationButton={true} // Show the default location button
                showsCompass={false} // Show the compass
                showsUserLocation={true} // Show the user's location on the map
                showsTraffic={true} // Show traffic information
                showsIndoors={true} // Show indoor maps
                showsBuildings={true} // Show 3D buildings
                showsScale={true} // Show the scale bar
                mapType='mutedStandard' // Map type (standard, satellite, hybrid)
                followsUserLocation={true} // Follow the user's location
                customMapStyle={[
                    { "elementType": "geometry", "stylers": [{ "color": "#036E65" }] },
                    { "elementType": "labels.icon", "stylers": [{ "visibility": "on" }] }
                ]}

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

                {/* Custom User Location Marker */}
                {/* {userLocation && (
                    <Marker coordinate={userLocation} anchor={{ x: 0.5, y: 0.5 }}>
                        <FontAwesome6Icon
                            name="location-crosshairs"
                            size={scale(34)}
                            color="#036E65"
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.8,
                                shadowRadius: 2,
                                elevation: 5, // For Android
                            }}
                        />
                    </Marker>

                )} */}



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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    pageTitle: {
        width: "100%", height: scale(40), justifyContent: "space-between", alignItems: "center", position: "absolute", top: scale(30), zIndex: 1, display: "flex", flexDirection: "row", marginTop: scale(24), paddingHorizontal: scale(20)
    },
    map: {
        flex: 1,
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: scale(100),
        borderWidth: 2,
        borderColor: '#036E65',
    },
    userLocationPin: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#036E65',
    },
    cardContainer: {
        position: 'absolute',
        bottom: scale(20),
        padding: 15,
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeader: {
        backgroundColor: '#fff',
        padding: scale(14),
        borderRadius: scale(16),
        borderWidth: 3,
        borderColor: '#036E65',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardImage: {
        width: "40%", height: scale(160), borderRadius: scale(12),
    },
    cardContent: {
        display: 'flex', flexDirection: 'column', justifyContent: "flex-end", alignItems: 'flex-end', width: "60%", gap: scale(8)
    },
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
    },
});
