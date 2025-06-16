import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    I18nManager,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import BgPattern from '@/assets/svg/Pattern';
import { router } from 'expo-router';

I18nManager.forceRTL(true);


const AccountInfoScreen = () => {
    const [gender, setGender] = useState('ذكر');
    const [birthDate, setBirthDate] = useState(new Date(1999, 5, 19)); // شهر يبدأ من 0
    const [showDatePicker, setShowDatePicker] = useState(true);

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            if (!isValidBirthDate(selectedDate)) {
                alert('تاريخ الميلاد غير صالح. يجب أن يكون عمرك 13 سنة على الأقل ولا يمكن أن يكون في المستقبل.');
                return;
            }
            setBirthDate(selectedDate);
        }
    };

    const isValidBirthDate = (date: Date): boolean => {
        const today = new Date();
        const minAge = 13;
        const minDate = new Date(
            today.getFullYear() - minAge,
            today.getMonth(),
            today.getDate()
        );

        return date <= minDate; // العمر 13 سنة أو أكثر، وليس في المستقبل
    };

    const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                style={{ flex: 1 }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
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
                                <Text style={styles.pageTitleText}>معلومات الحساب</Text>
                                <View style={styles.dummyView} />
                            </View>

                            {/* Profile Image */}
                            <View style={styles.profileSection}>
                                <Image
                                    source={require('@/assets/images/Image.png')}
                                    style={styles.profileImage}
                                />
                                <TouchableOpacity style={styles.cameraIcon}>
                                    <Icon name="camera-outline" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            {/* Form */}
                            <View style={styles.form}>
                                <Text style={styles.label}>البريد الالكتروني</Text>
                                <TextInput
                                    style={styles.input}
                                    value="albertstevano@gmail.com"
                                    editable={false}
                                />

                                <Text style={styles.label}>رقم الهاتف</Text>
                                <TextInput
                                    style={styles.input}
                                    value="+966 - 433-7656"
                                    editable={false}
                                />

                                <Text style={styles.label}>الاسم بالكامل</Text>
                                <TextInput
                                    style={styles.input}
                                    value="علي حسن طلال عسيري"
                                />

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    {/* النوع */}
                                    <View style={[styles.form, { width: '35%' }]}>
                                        <Text style={styles.label}>النوع</Text>
                                        <View style={styles.pickerWrapper}>
                                            <Picker
                                                selectedValue={gender}
                                                onValueChange={(itemValue) => setGender(itemValue)}
                                                mode="dropdown"
                                            >
                                                <Picker.Item label="ذكر" value="ذكر" />
                                                <Picker.Item label="أنثى" value="أنثى" />
                                            </Picker>
                                        </View>
                                    </View>

                                    {/* تاريخ الميلاد */}
                                    <View style={[styles.form, { width: '60%' }]}>
                                        <Text style={styles.label}>تاريخ الميلاد</Text>
                                        <TouchableOpacity
                                            onPress={() => setShowDatePicker(true)}
                                            style={[styles.input, {
                                                justifyContent: 'center',
                                                height: scale(70),
                                                marginTop: scale(4)
                                            }]}
                                        >
                                            <Text style={{ textAlign: 'right' }}>
                                                {formatDate(birthDate)}
                                            </Text>
                                        </TouchableOpacity>

                                        {showDatePicker && (
                                            <DateTimePicker

                                                value={birthDate}
                                                mode="date"
                                                display="default"
                                                onChange={handleDateChange}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity style={styles.saveButton}>
                                <Text style={styles.saveText}>حفظ</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AccountInfoScreen;
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
    profileSection: {
        width: '100%',
        alignItems: 'center',
        marginVertical: scale(20),
    },
    profileImage: {
        width: scale(90),
        height: scale(90),
        borderRadius: scale(45),
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: scale(110),
        backgroundColor: '#00966D',
        padding: scale(6),
        borderRadius: scale(20),
    },
    form: {
        width: '99%',
        margin: 1,
        gap: scale(4),
    },
    label: {
        fontSize: scale(14),
        color: '#555',
        lineHeight: scale(20),
        marginTop: scale(12),
        textAlign: 'right',
        fontFamily: 'Almarai',
    },
    input: {
        height: scale(50),
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: scale(8),
        paddingVertical: scale(10),
        paddingHorizontal: scale(12),
        fontSize: scale(14),
        textAlign: 'right',
        backgroundColor: '#fff',
        fontFamily: 'Almarai',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: scale(8),
        overflow: 'hidden',
        marginTop: scale(4),
        backgroundColor: '#fff',
        height: scale(70),
        justifyContent: 'center',
    },
    saveButton: {
        backgroundColor: '#036E65',
        paddingVertical: scale(12),
        borderRadius: scale(100),
        marginVertical: scale(30),
        alignItems: 'center',
        width: '100%',
    },
    saveText: {
        color: '#fff',
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
});
