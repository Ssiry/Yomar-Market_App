import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TextInput,
} from 'react-native';

import { scale } from 'react-native-size-matters';

interface PaymentCardProps {
    isVisible?: boolean;
    onPress: () => void;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ isVisible, onPress }) => {

    const [cardNumber, setCardNumber] = useState('');
    const [cardHolderName, setCardHolderName] = useState('');
    const [CVV, setCVV] = useState('');
    const [expireDate, setExpireDate] = useState('');
    const [errors, setErrors] = useState({
        cardHolderName: '',
        cardNumber: '',
        cvv: '',
        expireDate: '',
    });

    const handleCardHolderNameChange = (text: string) => {
        setCardHolderName(text);
    };

    const handleCardNumberChange = (text: string) => {
        const numericOnly = text.replace(/\D/g, '');
        const trimmed = numericOnly.slice(0, 16);
        const formatted = trimmed.match(/.{1,4}/g)?.join(' ') || '';
        setCardNumber(formatted);
    };

    const handleCVVChange = (text: string) => {
        const cvv = text.replace(/\D/g, '').slice(0, 4);
        setCVV(cvv);
    };

    const handleExpireDateChange = (text: string) => {
        let cleaned = text.replace(/\D/g, '');
        if (cleaned.length > 4) cleaned = cleaned.slice(0, 4);
        let formatted = cleaned;
        if (cleaned.length >= 3) formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
        setExpireDate(formatted);
    };

    const validateAndSubmit = () => {
        let valid = true;
        const newErrors: any = {};

        if (!cardHolderName) {
            newErrors.cardHolderName = 'الرجاء إدخال اسم حامل البطاقة';
            valid = false;
        }

        if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardNumber)) {
            newErrors.cardNumber = 'رقم البطاقة يجب أن يتكون من 16 رقمًا مفصولًا بمسافات';
            valid = false;
        }

        if (CVV.length < 3) {
            newErrors.cvv = 'CVV يجب أن يكون 3 أو 4 أرقام';
            valid = false;
        }

        if (!/^\d{2}\/\d{2}$/.test(expireDate)) {
            newErrors.expireDate = 'تاريخ الانتهاء يجب أن يكون بالتنسيق MM/YY';
            valid = false;
        } else {
            const [mm, yy] = expireDate.split('/').map(Number);
            const now = new Date();
            const currentYear = Number(String(now.getFullYear()).slice(2));
            const currentMonth = now.getMonth() + 1;

            if (mm < 1 || mm > 12 || yy < currentYear || (yy === currentYear && mm < currentMonth)) {
                newErrors.expireDate = 'تاريخ الانتهاء غير صالح';
                valid = false;
            }
        }

        setErrors(newErrors);

        if (valid) {
            // Submit your form logic here
            console.log('تم الإدخال بنجاح');
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={isVisible}
                transparent
                animationType="fade"
                onRequestClose={onPress}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.header}>اتمام عمليه الدفع</Text>
                        <Text style={styles.subHeader}>يرجي التاكد من بيانات الكارت جيدا</Text>

                        <Text style={[styles.inputHeader, { marginTop: scale(12) }]}>اسم حامل البطاقة</Text>
                        <TextInput
                            style={styles.textInput}
                            value={cardHolderName}
                            onChangeText={handleCardHolderNameChange}
                            placeholder="اكتب اسم حامل البطاقة"
                            placeholderTextColor="#878787"
                        />
                        {errors.cardHolderName ? <Text style={styles.errorMessage}>{errors.cardHolderName}</Text> : null}

                        <Text style={[styles.inputHeader, { marginTop: scale(12) }]}>رقم البطاقة</Text>
                        <TextInput
                            style={styles.textInput}
                            value={cardNumber}
                            onChangeText={handleCardNumberChange}
                            keyboardType="numeric"
                            placeholder="1234 5678 9012 3456"
                            placeholderTextColor="#878787"
                        />
                        {errors.cardNumber ? <Text style={styles.errorMessage}>{errors.cardNumber}</Text> : null}

                        <View style={styles.Row}>
                            <View style={styles.half}>
                                <Text style={styles.inputHeader}>CVV</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={CVV}
                                    onChangeText={handleCVVChange}
                                    keyboardType="numeric"
                                    secureTextEntry
                                    placeholder="123"
                                    placeholderTextColor="#878787"
                                />
                                {errors.cvv ? <Text style={styles.errorMessage}>{errors.cvv}</Text> : null}
                            </View>

                            <View style={styles.half}>
                                <Text style={styles.inputHeader}>تاريخ الانتهاء</Text>
                                <TextInput
                                    style={styles.textInput}
                                    value={expireDate}
                                    onChangeText={handleExpireDateChange}
                                    keyboardType="numeric"
                                    placeholder="MM/YY"
                                    placeholderTextColor="#878787"
                                />
                                {errors.expireDate ? <Text style={styles.errorMessage}>{errors.expireDate}</Text> : null}
                            </View>
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={validateAndSubmit}>
                            <Text style={styles.submitText}>تاكيد الدفع</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.cancelButton} onPress={onPress}>
                            <Text style={styles.submitText}>إلغاء</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default PaymentCard;

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '95%',
        backgroundColor: 'white',
        borderRadius: scale(25),
        paddingVertical: scale(30),
        paddingHorizontal: scale(20),
    },
    header: {
        fontFamily: 'Almarai',
        lineHeight: scale(30),
        fontSize: scale(20),
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subHeader: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        color: '#878787',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: scale(10),
    },
    inputHeader: {
        fontSize: scale(14),
        lineHeight: scale(20),
        fontFamily: 'Almarai',
        marginBottom: scale(8),
        textAlign: 'right',
    },
    errorMessage: {
        fontSize: scale(12),
        color: 'red',
        fontFamily: 'Almarai',
        textAlign: 'right',
        marginBottom: scale(8),
    },
    textInput: {
        width: '100%',
        height: scale(48),
        borderColor: '#878787',
        borderWidth: 1,
        borderRadius: scale(8),
        paddingHorizontal: scale(10),
        textAlign: 'right',
        fontFamily: 'Almarai',
        fontSize: scale(12),
    },
    Row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: scale(10),
    },
    half: {
        width: '48%',
    },
    submitButton: {
        marginTop: scale(20),
        backgroundColor: '#036E65',
        paddingVertical: scale(12),
        borderRadius: scale(100),
        alignItems: 'center',
    },
    cancelButton: {
        marginTop: scale(10),
        backgroundColor: '#4F9993',
        paddingVertical: scale(12),
        borderRadius: scale(100),
        alignItems: 'center',
    },
    submitText: {
        color: '#fff',
        fontFamily: 'Almarai',
        fontSize: scale(14),
        lineHeight: scale(20),
        fontWeight: 'bold',
    },
});
