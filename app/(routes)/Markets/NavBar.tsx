import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Banner from '@/components/elements/Banner';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import IonIcon from 'react-native-vector-icons/Ionicons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'
import { router } from 'expo-router';
// import NavBar from '@/components/elements/NavBar';


const NavBar = () => {
    return (
        <View style={styles.navbar}>
            {/* Left */}
            <View style={styles.navLeft}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={styles.iconButton}>
                    <IonIcon name="chevron-back-outline" size={scale(24)} color={'#036E65'} />
                </TouchableOpacity>

                <View style={styles.locationTextContainer}>
                    <Text style={styles.userName}>حسن عسيري</Text>
                    <Text style={styles.locationText}>1234 شارع الملك عبد العزيز</Text>
                </View>
            </View>

            {/* Right */}
            <View style={styles.navRight}>
                <TouchableOpacity
                    onPress={() => router.push('/(routes)/Utitilies/Search')}
                    style={styles.iconButton}>
                    <SearchIcon name="search" size={scale(24)} color={'#036E65'} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                    <SearchIcon name="notifications" size={scale(24)} color={'#036E65'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default NavBar

const styles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: scale(10),
    },
    navLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationTextContainer: {
        marginLeft: scale(10),
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    userName: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        fontWeight: "700",
        color: '#036E65',
        marginBottom: scale(4),
        marginTop: scale(4),
    },
    locationText: {
        fontFamily: 'Almarai',
        fontSize: scale(10),
        fontWeight: "300",
        color: '#036E65',
        height: scale(20),
    },
    navRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: scale(8),
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

})