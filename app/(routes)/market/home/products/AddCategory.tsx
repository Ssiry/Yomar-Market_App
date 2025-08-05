import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
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

interface AddCategoryProps {
    isVisible?: boolean;
    onPress: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ isVisible, onPress }) => {

    const [visible, setVisible] = useState(true);
    const [name, setName] = useState('');
    const [error, setError] = useState<string | null>(null);


    const handleNameChange = (text: string) => {
        setName(text);
    };



    const handleSaveCategory = async (categoryName: string) => {
        if (!categoryName || categoryName.trim() === '') {
            Alert.alert('⚠️ تنبيه', 'يرجى إدخال اسم التصنيف');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('market/token'); // أو حسب نوع المستخدم

            if (!token) {
                Alert.alert('خطأ', 'لم يتم العثور على التوكن');
                return;
            }

            const response = await axios.post(
                'http://192.168.1.11:5007/market/products/categories',
                { name: categoryName },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            Alert.alert('✅ تم', response.data.message || 'تمت إضافة التصنيف بنجاح');
            console.log('Added Category:', response.data.category);

        } catch (error) {
            console.error('❌ Error adding category:', error);
            if (
                typeof error === 'object' &&
                error !== null &&
                'response' in error &&
                typeof (error as any).response === 'object' &&
                (error as any).response?.status === 409
            ) {
                Alert.alert('⚠️ موجود', 'هذا التصنيف موجود مسبقًا');
            } else {
                Alert.alert('خطأ', 'حدث خطأ أثناء إضافة التصنيف');
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
                                إضافة قسم جديد
                            </Text>

                            <Text style={{ marginTop: scale(5), fontFamily: 'Almarai', color: '#878787', fontSize: scale(12), fontWeight: 'bold' }}>
                                يرجي التاكد من بيانات القسم و عدم تكراره قبل الإضافة
                            </Text>

                        </View>

                        {/*  */}
                        <View style={{ width: '100%', }}>

                            <Text style={[styles.inputHeader, { marginTop: scale(14) }]}>اسم القسم </Text>
                            <TextInput
                                style={styles.textInput}
                                value={name}
                                onChangeText={handleNameChange}
                                placeholder="اكتب اسم القسم"
                                placeholderTextColor="#878787"
                            />


                        </View>

                        {/*  */}
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: scale(10), justifyContent: 'center', alignItems: 'center', marginTop: scale(20), }}>

                            <TouchableOpacity
                                style={{ width: '100%', height: scale(50), backgroundColor: '#036E65', paddingVertical: scale(10), borderRadius: scale(100), justifyContent: 'center', alignItems: 'center', }}
                                onPress={() => {
                                    handleSaveCategory(name);
                                    setName('');
                                    onPress();
                                }}>

                                <Text style={{ fontFamily: 'Almarai', color: '#fff', fontSize: scale(14), fontWeight: 'bold', textAlign: 'center', }}>
                                    اضافة القسم
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

export default AddCategory

const styles = StyleSheet.create({

    container: { flex: 1, },

    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center', },

    modal: { width: '95%', backgroundColor: 'white', borderRadius: scale(25), paddingVertical: scale(30), gap: scale(10), paddingHorizontal: scale(20), justifyContent: 'space-between', alignItems: 'center', },

    iconContainer: { width: "100%", },

    inputHeader: { fontSize: scale(14), fontWeight: 'normal', marginBottom: scale(8), fontFamily: 'Almarai', textAlign: 'right', width: '100%', },

    errorMessage: { fontSize: scale(12), fontFamily: 'Almarai', color: 'red', textAlign: 'left', width: '100%', marginTop: scale(4), lineHeight: scale(20), },

    textInput: { width: '100%', height: scale(48), borderColor: '#878787', borderWidth: 1, borderRadius: scale(8), paddingHorizontal: scale(10), textAlign: 'right', fontFamily: 'Almarai', fontSize: scale(12), },

})



