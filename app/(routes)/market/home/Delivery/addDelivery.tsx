import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';

import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';

interface AddDeliveryProps {
    isVisible?: boolean;
    onPress: () => void;
}

const LINK = 'https//192.168.1.11:5007'

const AddDelivery: React.FC<AddDeliveryProps> = ({ isVisible, onPress }) => {

    const [visible, setVisible] = useState(true);
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [marketId, setMarketId] = useState('');



    const handlePhoneChange = (text: string) => {
        let filtered = text.replace(/[^0-9]/g, '');

        if (filtered.length === 1 && filtered !== '0') {
            filtered = '';
        } else if (filtered.length === 2 && filtered !== '05') {
            filtered = '0';
        }

        if (filtered.length > 10) {
            filtered = filtered.slice(0, 10);
        }

        setPhone(filtered);

        if (filtered.length < 10 && filtered.length > 0) {
            setError('رقم الهاتف غير مكتمل');
        } else {
            setError('');
        }
    };

    const handleNameChange = (text: string) => {
        setName(text);
    };

    const handlePasswordChange = (text: string) => {
        if (text.length < 8 && text.length !== 0) {
            setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        } else {
            setError('');
        }
        setPassword(text);
    };


    useEffect(() => {
        const fetchMarketId = async () => {
            const storedMarketId = await AsyncStorage.getItem('marketId');
            setMarketId(storedMarketId ?? '');
            if (!storedMarketId) {
                Alert.alert("⚠️", "لا يمكن العثور على هوية السوق");
                return;
            }
        };
        fetchMarketId();
    }, []);


    const handleSave = async () => {
        if (!phone || !password || !name) {
            Alert.alert("❗ خطأ", "يرجى إدخال اسم المندوب، رقم الهاتف وكلمة المرور");
            return;
        }

        if (phone.length < 10 || password.length < 8) {
            Alert.alert("⚠️", "تأكد من أن رقم الجوال 10 أرقام وكلمة المرور 8 أحرف على الأقل");
            return;
        }

        try {
            const marketId = await AsyncStorage.getItem('marketId');
            if (!marketId) {
                Alert.alert("⚠️", "لا يمكن العثور على هوية السوق");
                return;
            }

            const requestData = {
                phone,
                password,
                name,
                marketId: Number(marketId),
            };


            const response = await axios.post('http://192.168.1.11:5007/market/deliveries', requestData);

            if (response.status === 201) {
                Alert.alert("✅ تم", "تم تسجيل الكابتن بنجاح");
                setPhone('');
                setPassword('');
                setName('');
                onPress(); // إغلاق المودال
            } else {
                Alert.alert("⚠️", response.data.error || "فشل التسجيل");
            }

        } catch (error: any) {
            console.error("❌ Error:", error);
            if (error.response?.status === 409) {
                Alert.alert("⚠️", "رقم الهاتف مستخدم مسبقًا");
            } else {
                Alert.alert("❌", "حدث خطأ أثناء التسجيل");
            }
        }
    };



    return (
        <View style={styles.container}>
            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setVisible(false)}
            >

                <View style={styles.overlay}>
                    <View style={styles.modal}>

                        {/*  */}
                        <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', gap: scale(10), }}>

                            <View style={{ width: scale(50), height: scale(50), backgroundColor: '#036E65', borderRadius: scale(50), justifyContent: 'center', alignItems: 'center', }}>

                                <Icon name="add-circle-outline" size={scale(30)} color="#fff" />

                            </View>

                            <Text style={{ fontFamily: 'Almarai', color: '#000', fontSize: scale(20), fontWeight: 'bold' }}>
                                إضافة مندوب جديد
                            </Text>

                            <Text style={{ marginTop: scale(5), fontFamily: 'Almarai', color: '#878787', fontSize: scale(12), fontWeight: 'bold' }}>
                                يرجي التاكد من بيانات المندوب قبل الإضافة
                            </Text>

                        </View>

                        {/*  */}
                        <View style={{ width: '100%', }}>

                            <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>اسم المندوب </Text>
                            <TextInput
                                style={styles.textInput}
                                value={name}
                                onChangeText={handleNameChange}
                                placeholder="اكتب اسم المندوب"
                                placeholderTextColor="#878787"
                            />


                            <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>رقم الجوال</Text>
                            <TextInput
                                style={styles.textInput}
                                value={phone}
                                onChangeText={handlePhoneChange}
                                keyboardType="numeric"
                                maxLength={10}
                                placeholder="05XXXXXXXX"
                                placeholderTextColor="#878787"
                            />

                            <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>
                                كلمة المرور
                            </Text>
                            <TextInput
                                style={styles.textInput}
                                value={password}
                                onChangeText={handlePasswordChange}
                                secureTextEntry={true}
                                textContentType="password"
                                placeholder="ادخل كلمة المرور"
                                placeholderTextColor="#878787"
                            />

                            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

                        </View>

                        {/*  */}
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: scale(10), justifyContent: 'center', alignItems: 'center', marginTop: scale(20), }}>

                            <TouchableOpacity
                                style={{ width: '100%', height: scale(50), backgroundColor: '#036E65', paddingVertical: scale(10), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center', }}
                                onPress={() => {
                                    handleSave();
                                }}>

                                <Text style={{ fontFamily: 'Almarai', color: '#fff', fontSize: scale(14), fontWeight: 'bold', textAlign: 'center', }}>
                                    اضافة المندوب
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ width: '100%', height: scale(50), backgroundColor: '#4F9993', paddingVertical: scale(10), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center', }}
                                onPress={() => {
                                    onPress();
                                }}>


                                <Text style={{ fontFamily: 'Almarai', color: '#fff', fontSize: scale(14), fontWeight: 'bold', textAlign: 'center', }}>
                                    إلغاء
                                </Text>
                            </TouchableOpacity>


                        </View>


                    </View>
                </View>

            </Modal>

        </View>
    )
}

export default AddDelivery

const styles = StyleSheet.create({

    container: { flex: 1, },

    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', },

    modal: { width: '95%', backgroundColor: 'white', borderRadius: scale(25), paddingVertical: scale(30), gap: scale(10), paddingHorizontal: scale(20), justifyContent: 'space-between', alignItems: 'center', },

    iconContainer: { width: "100%", },

    inputHeader: { fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: 'right', width: '100%', },

    errorMessage: { fontSize: scale(12), fontFamily: 'Almarai', color: 'red', textAlign: 'left', width: '100%', marginTop: scale(4), lineHeight: scale(20), },

    textInput: { width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), textAlign: 'right', fontFamily: 'Almarai', fontSize: scale(12), },

})



