import React, { useEffect, useState } from 'react';
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
    Modal,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { scale } from 'react-native-size-matters';
import DateTimePicker from '@react-native-community/datetimepicker';
import BgPattern from '@/assets/svg/Pattern';
import { router } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// I18nManager.forceRTL(true);


const AccountInfoScreen = () => {

    // const [img, setImg] = useState();
    // const [gender, setGender] = useState('ذكر');
    // const [birthDate, setBirthDate] = useState(new Date(1999, 5, 19)); // شهر يبدأ من 0
    const [showDatePicker, setShowDatePicker] = useState(true);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [img, setImg] = useState(); // لاحقًا
    const [gender, setGender] = useState('ذكر');
    const [birthDate, setBirthDate] = useState(new Date(1999, 5, 19));

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


    const handleSave = async () => {
        try {
            const token = await AsyncStorage.getItem('delivery/token');
            if (!token) {
                alert("يرجى تسجيل الدخول أولاً.");
                return;
            }

            const response = await axios.put('http://192.168.1.11:5007/delivery/account/update',
                {
                    name,
                    phone,
                    imguri: img, // لاحقًا

                    // gender: gender === 'ذكر' ? 'MALE' : 'FEMALE',
                    // birthDate: birthDate.toISOString(), // ✅ هذا المطلوب
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );



            alert("✅ تم حفظ البيانات بنجاح");
        } catch (error) {
            console.error(error);
            alert("❌ حدث خطأ أثناء الحفظ");
        }
    };


    const confirmDelete = () => {
        return new Promise((resolve) => {
            Alert.alert(
                'تحذير',
                'هل أنت متأكد من رغبتك في حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.',
                [
                    { text: 'إلغاء', onPress: () => resolve(false), style: 'cancel' },
                    { text: 'حذف', onPress: () => resolve(true), style: 'destructive' },
                ],
                { cancelable: true }
            );
        });
    };


    const handleDeleteAccount = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                alert("❌ لم يتم العثور على توكن، يرجى تسجيل الدخول.");
                return;
            }



            // تأكيد قبل الحذف
            const confirm = confirmDelete(); // اختياري: تستخدم نافذة تأكيد

            if (!confirm) return;

            await axios.delete('http://192.168.1.11:5007/delivery/account/delete', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await AsyncStorage.removeItem('delivery/token'); // إزالة التوكن
            alert("✅ تم حذف الحساب بنجاح");
            router.replace('/(routes)/delivery/auth'); // إعادة التوجيه لصفحة تسجيل الدخول
        } catch (error) {
            console.error(error);
            alert("❌ فشل في حذف الحساب.");
        }
    };




    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await AsyncStorage.getItem('delivery/token');
                console.log("Fetched token:", token);

                if (!token) return;

                const response = await axios.get('http://192.168.1.11:5007/delivery/account/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const delivery = response.data;



                setImg(delivery.imguri || ''); // لاحقًا
                setName(delivery.name || '');
                await AsyncStorage.setItem('userName', delivery.name || '');
                setPhone(delivery.phone || '');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Failed to fetch profile:', error.response?.data || error.message);
                } else {
                    console.error('Failed to fetch profile:', error);
                }
            }
        };

        fetchProfile();
    }, []);

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
                                    // source={img ? { uri: img } : require('@/assets/images/character.png')}
                                    source={require('@/assets/images/character.png')}
                                    style={styles.profileImage}
                                />
                                <TouchableOpacity style={styles.cameraIcon}>
                                    <Icon name="camera-outline" size={16} color="#fff" />
                                </TouchableOpacity>
                            </View>


                            {/* Form */}
                            <View style={styles.form}>


                                <Text style={styles.label}>رقم الجوال</Text>
                                <TextInput
                                    style={styles.input}
                                    value={phone}
                                    placeholder='05XXXXXXXX'
                                    editable={false}
                                />

                                <Text style={styles.label}>الاسم بالكامل</Text>
                                <TextInput
                                    style={styles.input}
                                    value={name}
                                    onChangeText={setName}
                                />

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

                                </View>
                            </View>

                            {/* Save Button */}
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.saveText}>حفظ</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[styles.saveButton, { backgroundColor: '#c0392b' }]}
                                onPress={handleDeleteAccount}>
                                <Text style={styles.saveText}>حذف الحساب</Text>
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
