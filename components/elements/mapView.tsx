import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { scale } from 'react-native-size-matters';

const markerData = [
    {
        id: 1,
        title: 'تموينات الراعي',
        description: 'ألبان ومواد غذائية',
        coordinate: { latitude: 26.5593, longitude: 31.6956 },
        image: require('@/assets/images/Background.png'),
    },
    {
        id: 2,
        title: 'تموينات المدينة',
        description: 'خضروات وفواكه',
        coordinate: { latitude: 26.5605, longitude: 31.698 },
        image: require('@/assets/images/Background.png'),
    },
];

export default function MapWithMarkers() {
    return (
        <View style={styles.container}>
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
                    <Marker key={marker.id} coordinate={marker.coordinate}>
                        <Image
                            source={marker.image}
                            style={styles.markerImage}
                            resizeMode="cover"
                        />
                        <Callout tooltip>
                            <View style={styles.calloutContainer}>
                                <Image source={marker.image} style={styles.calloutImage} />
                                <View style={styles.calloutTextContainer}>
                                    <Text style={styles.calloutTitle}>{marker.title}</Text>
                                    <Text style={styles.calloutDesc}>{marker.description}</Text>
                                    <TouchableOpacity
                                        style={styles.calloutButton}
                                        onPress={() => console.log('عرض التفاصيل')}
                                    >
                                        <Text style={styles.calloutButtonText}>عرض التفاصيل</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Callout>
                    </Marker>
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: scale(12),
        marginVertical: scale(12),
    },
    map: {
        height: scale(200),
        borderRadius: scale(12),
    },
    markerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#036E65',
    },
    calloutContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        width: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,

        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    calloutImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 10,
    },
    calloutTextContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    calloutTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#036E65',
        marginBottom: 4,
        fontFamily: 'Almarai',
    },
    calloutDesc: {
        fontSize: 12,
        color: '#444',
        marginBottom: 6,
        fontFamily: 'Almarai',
    },
    calloutButton: {
        backgroundColor: '#036E65',
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    calloutButtonText: {
        color: '#fff',
        fontSize: 12,
        fontFamily: 'Almarai',
    },
});
