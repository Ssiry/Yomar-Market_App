import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
} from 'react-native';
import MapView from 'react-native-maps';
import { scale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Location from 'expo-location';

interface PopUpProps {
    isVisible?: boolean;
    onClose: () => void;
    onConfirm: (location: {
        latitude: number;
        longitude: number;
        city: string;
        country: string;
        fullAddress: {
            name: string;
            street: string;
            subregion: string;
            city: string;
            region: string;
            country: string;
            postalCode: string;
        };
    }) => void;
}

const PopUp: React.FC<PopUpProps> = ({ isVisible, onClose, onConfirm }) => {
    const mapRef = useRef<MapView>(null);
    const [region, setRegion] = useState({
        latitude: 26.8206,
        longitude: 30.8025,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });

    const [addressInfo, setAddressInfo] = useState({
        name: '',
        street: '',
        subregion: '',
        city: '',
        region: '',
        country: '',
        postalCode: '',
    });


    // make the map center on the current location
    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }

                const location = await Location.getCurrentPositionAsync({});
                if (mapRef.current) {
                    mapRef.current.animateToRegion({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    });
                }
            } catch (error) {
                console.log('Error getting current location:', error);
            }
        };

        getCurrentLocation();
    }
        , []);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const geo = await Location.reverseGeocodeAsync(
                    {
                        latitude: region.latitude,
                        longitude: region.longitude,
                        // locale: 'ar' ,
                    },
                );


                if (geo.length > 0) {
                    const g = geo[0];
                    setAddressInfo({
                        name: g.name || '',
                        street: g.street || '',
                        subregion: g.subregion || '',
                        city: g.city || '',
                        region: g.region || '',
                        country: g.country || '',
                        postalCode: g.postalCode || '',
                    });
                }
            } catch (error) {
                console.log('خطأ في جلب العنوان:', error);
            }
        };

        fetchAddress();
    }, [region]);

    const handleConfirm = () => {
        onConfirm({
            latitude: region.latitude,
            longitude: region.longitude,
            city: addressInfo.city,
            country: addressInfo.country,
            fullAddress: addressInfo,
        });
        onClose();
    };

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    {/* العنوان */}
                    <View style={styles.titleContainer}>
                        <Ionicons name="location-sharp" size={scale(30)} color="#00695C" />
                        <Text style={styles.title}>تحديد الموقع من الخريطة</Text>
                    </View>

                    {/* الخريطة */}
                    <View style={styles.modalMap}>
                        <MapView
                            ref={mapRef}
                            style={styles.map}
                            initialRegion={region}
                            onRegionChangeComplete={setRegion}
                        />
                        <View style={styles.targetIcon}>
                            <Ionicons name="location-sharp" size={30} color="#0a7" />
                        </View>
                    </View>

                    {/* معلومات الموقع + زر التأكيد */}
                    <View style={styles.btnContainer}>

                        <View style={{ width: '100%', flexDirection: 'column', gap: scale(5), alignItems: 'center', justifyContent: 'center' }}>

                            <Text style={{ fontSize: scale(16), fontFamily: 'Almarai', fontWeight: '600', textAlign: 'center', lineHeight: scale(22), }}
                            >{` ${addressInfo.name || 'جارٍ التحميل...'}`}</Text>

                            <Text style={{ width: '100%', textAlign: 'center' }}>{` ${addressInfo.city}, ${addressInfo.country}`}</Text>

                            <Text style={{ fontSize: scale(16), fontFamily: '', fontWeight: '600', textAlign: 'center', lineHeight: scale(22) }}>
                                {`${region.latitude.toFixed(4)}, ${region.longitude.toFixed(4)}`}</Text>
                        </View>

                        <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
                            <Text style={styles.confirmText}>تأكيد الموقع</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: scale(25),
        padding: scale(20),
        justifyContent: 'center',
        gap: scale(10),
        alignItems: 'center',
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        gap: scale(10),
        padding: scale(10),
        borderRadius: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6F0F0',
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        lineHeight: scale(26),
        fontFamily: 'Almarai',
        marginBottom: scale(10),
    },
    btnContainer: {
        alignItems: 'center',
        width: '100%',
        marginVertical: scale(10),
        gap: scale(10),
    },
    modalMap: {
        width: '100%',
        height: '60%',
        borderRadius: scale(15),
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    targetIcon: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -15,
        marginTop: -30,
        zIndex: 10,
    },
    confirmBtn: {
        width: '100%',
        backgroundColor: '#0a7',
        paddingVertical: 12,
        borderRadius: 10,
    },
    confirmText: {
        color: '#fff',
        fontSize: scale(16),
        fontFamily: 'Almarai',
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: scale(22),
    },
});

export default PopUp;
