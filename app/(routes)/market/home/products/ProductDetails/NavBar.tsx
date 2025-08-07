import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign';
import Ionic from 'react-native-vector-icons/Ionicons';
import Awesome6Icon from 'react-native-vector-icons/FontAwesome5';
import { scale } from 'react-native-size-matters';
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { push } from 'expo-router/build/global-state/routing';

const API_URL = 'http://192.168.1.11:5007/market/products/delete'; // غيّر IP لو لازم


const NavBar = () => {

    const [share, setShare] = React.useState(false);


    //    const handleDeleteProduct = async () => {
    const handleDeleteProduct = async () => {
        try {

            const token = await AsyncStorage.getItem('market/token'); // تأكد من تخزين التوكن في AsyncStorage
            if (!token) {
                Alert.alert('خطأ', 'لم يتم العثور على توكن المصادقة');
                return;
            }

            const id = await AsyncStorage.getItem('selectedProductId'); // تأكد من تخزين ID المنتج في AsyncStorage
            if (!id) {
                Alert.alert('خطأ', 'لم يتم العثور على ID المنتج');
                return;
            }


            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log('✅ Product deleted:', response.data);

            Alert.alert('تم الحذف', 'تم حذف المنتج بنجاح');
            router.push('/(routes)/market/home/products'); // إعادة التوجيه إلى صفحة المنتجات بعد الحذف

        } catch (error: any) {
            console.error('❌ Error deleting product:', error);

            if (error.response?.status === 404) {
                Alert.alert('خطأ', 'المنتج غير موجود');
            } else {
                Alert.alert('خطأ', 'فشل في حذف المنتج');
            }
        }
    };



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
                    onPress={() => handleDeleteProduct()}
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
                        // setShare(true);
                        // router.push('')
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