import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Awesome6Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';



const NavBar = ({ onPress = () => { } }) => {
    const [share, setShare] = React.useState(false);
    return (

        <View style={styles.navbar}>
            {/* Left */}
            <View style={styles.navLeft}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionic name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>

            </View>

            {/* Right */}
            <View style={styles.navRight}>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.iconButton}>
                    <Awesome6Icon name="trash" size={scale(20)} color={'#036E65'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        router.push('/(routes)/market/home/products/editProduct')
                    }}
                >
                    <Icon name="edit" size={scale(24)} color={'#036E65'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconButton}
                    onPress={() => {
                        setShare(true);
                    }}
                >
                    <Awesome6Icon name="share-alt" size={scale(22)} color={'#036E65'} />
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