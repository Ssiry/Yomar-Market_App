import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BgPattern from '@/assets/svg/Pattern'
import { scale } from 'react-native-size-matters'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-native-safe-area-context'
import LanguageModal from './Language'

// ✅ نقل المكون ProfileItem للأعلى واستخدام props للتحكم بالحالة
const ProfileItem: React.FC<{
    category: string;
    label: string;
    isSwitch?: boolean;
    value?: boolean;
    onValueChange?: (value: boolean) => void;
    onPress?: () => void;
}> = ({ category, label, isSwitch, value, onValueChange, onPress }) => (
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
            <Text style={styles.text}>{label}</Text>
        </View>

        {isSwitch ? (
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{ false: '#000', true: '#036E65' }}
                thumbColor={value ? '#fff' : '#FED90E'}
            />
        ) : (
            <Icon name="chevron-forward" size={scale(20)} color="#333" />
        )}
    </TouchableOpacity>
);

const Index = () => {
    // ✅ يجب أن تكون هذه داخل مكون GeneralSettings
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(true);
    const [isLocationEnabled, setIsLocationEnabled] = useState(false);
    const [language, setLanguage] = useState<boolean>(false);

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
                keyboardShouldPersistTaps="handled"
            >

                {/* Header */}
                <View style={styles.pageTitle}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                        <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.pageTitleText}>الإعدادات</Text>
                    <View style={styles.dummyView} />
                </View>

                <View style={styles.card}>
                    <Text style={{ width: '100%', fontFamily: 'Almarai' }}>الحساب</Text>
                    <ProfileItem
                        category="غير ذلك"
                        label="السماح بالاشعارات"
                        isSwitch
                        value={isNotificationEnabled}
                        onValueChange={setIsNotificationEnabled}
                    />
                    <ProfileItem
                        category="غير ذلك"
                        label="السماح بالموقع"
                        isSwitch
                        value={isLocationEnabled}
                        onValueChange={setIsLocationEnabled}
                    />
                    {/* <TouchableOpacity onPress={() => setLanguage(true)}   > */}

                    <ProfileItem
                        category="غير ذلك"
                        label="اللغة"
                        onPress={() => { setLanguage(true) }}
                    />
                    {/* </TouchableOpacity> */}
                </View>

                <View style={styles.card}>
                    <Text style={{ width: '100%', fontFamily: 'Almarai' }}>غير ذلك</Text>
                    <ProfileItem category="الحساب" label="حول “يومآر”" onPress={() => {
                        router.push('/(routes)/delivery/home/account/About')
                    }} />
                    <ProfileItem category="الحساب" label="سياسات الخصوصية" onPress={() => {
                        router.push('/(routes)/delivery/home/account/PrivacyPolicy')
                    }} />
                    <ProfileItem category="الحساب" label="القواعد والشروط" onPress={() => {
                        router.push('/(routes)/delivery/home/account/T&C')
                    }} />
                </View>
            </ScrollView>

            {/* language modal */}
            <LanguageModal
                visible={language}
                onConfirm={() => setLanguage(false)}
                onCancel={() => setLanguage(false)}
            />



        </SafeAreaView>
    )
}

export default Index


const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(24),
    },
    scrollView: {
        width: '100%',
    },
    scrollcontent: {
        alignItems: 'center',
    },
    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
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
    dummyView: {
        width: scale(36),
        height: scale(36),
    },
    card: {
        width: '100%',
        paddingVertical: scale(10),
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
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
        lineHeight: scale(20),

    },
})