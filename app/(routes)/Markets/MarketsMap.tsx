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
        coordinate: { latitude: 24.0819, longitude: 32.8960 },
        image: require('@/assets/images/Background.png'),
        rate: 3.5,
    },
    {
        id: 2,
        title: 'مقهى القهوة',
        description: 'أفضل أنواع القهوة',
        coordinate: { latitude: 24.0900, longitude: 32.9020 },
        image: require('@/assets/images/Background.png'),
        rate: 4.0,
    },
    {
        id: 3,
        title: 'مطعم العائلة',
        description: 'وجبات عائلية لذيذة',
        coordinate: { latitude: 24.0930, longitude: 32.9000 },
        image: require('@/assets/images/Background.png'),
        rate: 4.2,
    },
    {
        id: 4,
        title: 'محل الحرف اليدوية',
        description: 'منتجات يدوية مميزة',
        coordinate: { latitude: 24.0950, longitude: 32.9030 },
        image: require('@/assets/images/Background.png'),
        rate: 4.5,
    },
    {
        id: 5,
        title: 'سوبر ماركت المدينة',
        description: 'كل ما تحتاجه من المواد الغذائية',
        coordinate: { latitude: 24.0920, longitude: 32.9045 },
        image: require('@/assets/images/Background.png'),
        rate: 4.1,
    },
    {
        id: 6,
        title: 'مكتبة الثقافة',
        description: 'كتب تعليمية وثقافية',
        coordinate: { latitude: 24.0940, longitude: 32.9050 },
        image: require('@/assets/images/Background.png'),
        rate: 3.8,
    },
];

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // in kilometers
}

export default function MarketsMap() {
    const [selectedMarker, setSelectedMarker] = useState<null | typeof markerData[0]>(null);
    const [userLocation, setUserLocation] = useState<null | Location.LocationObjectCoords>(null);
    const [distanceKm, setDistanceKm] = useState<number | null>(null);
    const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
    const slideAnim = useRef(new Animated.Value(300)).current;

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(location.coords);
        })();
    }, []);

    const showCard = (marker: typeof markerData[0]) => {
        setSelectedMarker(marker);
        if (userLocation) {
            const dist = calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                marker.coordinate.latitude,
                marker.coordinate.longitude
            );
            setDistanceKm(dist);
            setEstimatedTime(Math.round((dist / 0.3) * 5)); // assuming 300m = 5 min
        }
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
            setDistanceKm(null);
            setEstimatedTime(null);
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.pageTitle}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>المحلات القريبة</Text>
                <View style={{ width: scale(40) }} />
            </View>

            <MapView
                style={styles.map}
                region={
                    userLocation
                        ? {
                            latitude: userLocation.latitude,
                            longitude: userLocation.longitude,
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
                showsUserLocation={true}
                cameraZoomRange={{
                }}
                userLocationUpdateInterval={1000}
                showsMyLocationButton
                showsCompass={false}
                mapType="mutedStandard"
                customMapStyle={[
                    { elementType: 'geometry', stylers: [{ color: '#036E65' }] },
                    { elementType: 'labels.icon', stylers: [{ visibility: 'on' }] },
                ]}
            >
                {markerData.map((marker) => (
                    <Marker
                        key={marker.id}
                        coordinate={marker.coordinate}
                        onPress={() => showCard(marker)}
                    >
                        <Image source={marker.image} style={styles.markerImage} />
                    </Marker>
                ))}
            </MapView>

            {selectedMarker && (
                <Animated.View
                    style={[
                        styles.cardContainer,
                        { transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <View style={styles.cardHeader}>
                        <Image source={selectedMarker.image} style={styles.cardImage} />

                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>{selectedMarker.title}</Text>
                            <Text style={styles.cardDesc}>{selectedMarker.description}</Text>

                            <View style={styles.ratingRow}>
                                <Text style={styles.ratingText}>{selectedMarker.rate}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const fullStars = Math.floor(selectedMarker.rate);
                                        const hasHalfStar = selectedMarker.rate - fullStars >= 0.5;
                                        let iconName = 'star-outline';
                                        if (index < fullStars) iconName = 'star';
                                        else if (index === fullStars && hasHalfStar)
                                            iconName = 'star-half';
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

                            <View style={styles.detailsRow}>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>المسافة</Text>
                                    <Text style={styles.detailValue}>
                                        {distanceKm ? distanceKm.toFixed(1) : '--'} كم
                                    </Text>
                                </View>
                                <View style={styles.detailBox}>
                                    <Text style={styles.detailLabel}>وقت التوصيل</Text>
                                    <Text style={styles.detailValue}>
                                        {estimatedTime ?? '--'} دقيقة
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.closeTextContainer}
                            onPress={hideCard}
                        >
                            <Text style={styles.closeText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.buyButton}>
                        <Text style={styles.buyButtonText}>تسوق الآن</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    pageTitle: {
        width: '100%',
        height: scale(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: scale(54),
        zIndex: 1,
        paddingHorizontal: scale(20),
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
        textAlign: 'center',
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: scale(100),
        borderWidth: 2,
        borderColor: '#036E65',
    },
    cardContainer: {
        position: 'absolute',
        bottom: scale(20),
        width: '100%',
        padding: scale(15),
        alignItems: 'center',
    },
    cardHeader: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: scale(16),
        borderWidth: 3,
        borderColor: '#036E65',
        padding: scale(14),
        elevation: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
    },
    cardImage: {
        width: '40%',
        height: scale(160),
        borderRadius: scale(12),
    },
    cardContent: {
        width: '60%',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingVertical: scale(18),
        gap: scale(6),
    },
    cardTitle: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#036E65',
        fontFamily: 'Almarai',
    },
    cardDesc: {
        fontSize: scale(13),
        color: '#4F9993',
        fontFamily: 'Almarai',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: scale(6),
    },
    ratingText: {
        fontFamily: 'Almarai',
        color: '#036E65',
        fontWeight: '700',
        fontSize: scale(18),
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

        width: '100%',
    },
    detailBox: {
        width: '48%',
        alignItems: 'flex-end',

    },
    detailLabel: {
        fontFamily: 'Almarai',
        fontSize: scale(10),
        textAlign: 'center',
        color: '#4F9993',
    },
    detailValue: {
        fontFamily: 'Almarai',
        fontWeight: '700',
        textAlign: 'center',

        fontSize: scale(16),
        color: '#036E65',
    },
    buyButton: {
        width: '100%',
        height: scale(48),
        backgroundColor: '#036E65',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: scale(100),
        marginTop: scale(16),
    },
    buyButtonText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#fff',
    },
    closeTextContainer: {
        position: 'absolute',
        top: scale(16),
        left: scale(16),
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        width: scale(32),
        height: scale(32),
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#444',
    },
});