import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import BgPattern from '@/assets/svg/Pattern';
import Icon from 'react-native-vector-icons/Ionicons';
import CurrentOrders from '../orders/currentOrders';
import { router } from 'expo-router';

const ProfileItem: React.FC<{ icon: string; label: string; onPress: () => void }> = ({ icon, label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.Row}>
        <View
            style={[
                styles.Row,
                {
                    width: 'auto',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: scale(20),
                },
            ]}
        >

            <View style={styles.iconButton}>
                <Icon name={icon} size={scale(20)} color="#333" />
            </View>
            <Text style={styles.text}>{label}</Text>
        </View>
        <Icon name="chevron-forward" size={scale(20)} color="#333" />
    </TouchableOpacity>
);

const Profile = () => {
    const [activeOrder, setActiveOrder] = useState(0);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
            >
                {/* Page Title */}
                <View style={styles.pageTitle}>
                    <View style={styles.dummyView} />
                    <Text style={styles.pageTitleText}>اعدادات الحساب</Text>
                    <View style={styles.dummyView} />
                </View>

                {/* Profile Image & Info */}
                <View style={{ alignItems: 'center', marginTop: scale(20) }}>
                    <TouchableOpacity>
                        <Image
                            source={require('@/assets/images/Image.png')}
                            style={styles.profileImage}
                            resizeMode="cover"
                        />
                        <View style={styles.cameraIcon}>
                            <Icon name="camera" color="#333" size={scale(16)} />
                        </View>
                    </TouchableOpacity>
                    <Text style={styles.userName}>طلال السعدي</Text>
                    <Text style={styles.userPhone}>+996 0566 2322</Text>
                </View>

                {/* Current Orders */}
                {activeOrder > 0 && <CurrentOrders />}

                {/* Profile Navigation */}
                <View style={styles.card}>
                    <Text style={{ width: '100%', fontFamily: 'Almarai' }}> الحساب</Text>
                    <ProfileItem icon="person" label="معلومات الحساب" onPress={() => {
                        router.push('/(routes)/home/account/AccountInfoScreen');
                    }} />
                    <ProfileItem icon="settings-outline" label="الاعدادات العامة" onPress={() => { }} />
                </View>

                {/* Support */}
                <View style={styles.card}>
                    <Text style={{ width: '100%', fontFamily: 'Almarai' }}>مركز المساعدة</Text>
                    <ProfileItem icon="help-circle-outline" label="الدعم الفني" onPress={() => { }} />
                </View>

                {/* Logout */}
                <TouchableOpacity style={styles.logoutButton}>
                    <Icon name="exit-outline" size={scale(20)} color="red" />
                    <Text style={styles.logoutText}>تسجيل الخروج</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30),
    },
    scrollcontent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
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
    pageTitle: {
        width: '100%',
        height: scale(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
    },
    profileImage: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
        marginBottom: scale(10),
    },
    cameraIcon: {
        padding: scale(10),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5E5E5',
        borderRadius: scale(20),
        position: 'absolute',
        bottom: scale(10),
        right: scale(0),
    },
    userName: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: scale(5),
        textAlign: 'center',
        lineHeight: scale(20),
    },
    userPhone: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'bold',
        color: '#333',
        marginBottom: scale(5),
    },
    card: {
        width: '100%',
        paddingVertical: scale(10),
        paddingHorizontal: scale(20),
        borderRadius: scale(8),
        marginVertical: scale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    Row: {
        width: '100%',
        flexDirection: 'row',
        marginTop: scale(10),

        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: 'light',
        color: '#333',
        textAlign: 'right',
        lineHeight: scale(20),
    },
    logoutButton: {
        width: '100%',
        paddingVertical: scale(10),
        paddingHorizontal: scale(20),
        backgroundColor: 'transparent',
        borderRadius: scale(100),
        borderColor: 'red',
        borderWidth: scale(1),
        marginVertical: scale(20),
        marginBottom: scale(30),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(10),
    },
    logoutText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        lineHeight: scale(20),
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold',
    },
});
