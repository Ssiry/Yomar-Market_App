import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome5';
import { router } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NavBarProps {
    name: string;
}

// const CategoryBar: React.FC<CategoryBarProps> 


const NavBar: React.FC<NavBarProps> = ({ name }: NavBarProps) => {



    return (
        <View style={styles.navbar}>
            {/* Left */}
            <View style={styles.navLeft}>
                <Icon name="location-history" size={scale(36)} color={'#036E65'} />
                <View style={styles.locationTextContainer}>
                    <Text style={styles.userName}>{name}</Text>
                    {/* <Text style={styles.locationText}>1234 شارع الملك عبد العزيز</Text> */}
                </View>
            </View>

            {/* Right */}
            <View style={styles.navRight}>
                {/* file-circle-plus */}
                {/* 
                {isfileUpload &&
                    <TouchableOpacity
                        onPress={() => pickDocument()}
                        style={styles.iconButton}>
                        <FontAwesome6Icon name="file-upload" size={scale(24)} color={'#036E65'} />
                    </TouchableOpacity>
                } */}
                <TouchableOpacity
                    onPress={() => router.push('/(routes)/chat')}
                    style={styles.iconButton}>
                    <Ionicons name="chatbox" size={scale(24)} color={'#036E65'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}>
                    <Ionicons name="notifications" size={scale(24)} color={'#036E65'} />
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
        marginLeft: scale(4),
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