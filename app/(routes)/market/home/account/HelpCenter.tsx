import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import BgPattern from '@/assets/svg/Pattern'
import { scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'

const HelpCenter = () => {
    const [Title, setTitle] = React.useState('')
    const [Message, setMessage] = React.useState('')
    return (
        <SafeAreaView style={styles.safeContainer}>


            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>

            <KeyboardAvoidingView style={{ width: '100%' }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

                <ScrollView
                    style={{
                        width: '100%',

                    }}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >


                    {/* Page Title */}
                    <View style={styles.pageTitle}>
                        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                            <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.pageTitleText}>
                            مركز المساعدة
                        </Text>
                        <View style={styles.dummyView} />
                    </View>

                    <Text style={styles.header}>
                        مركز المساعدة
                    </Text>
                    <Text style={styles.subHeader}>
                        نحن سعداء دائما بسماعك ،
                        {'\n'}
                        لا تتردد في سوالنا ما تبي
                    </Text>


                    {/* Form */}
                    <View style={styles.form}>
                        <Text style={styles.label}>
                            عنوان الرسالة
                        </Text>
                        <TextInput
                            style={styles.input}
                            value={Title}
                            onChangeText={setTitle}
                            placeholder='مثال: مشكلة بالحساب ، مشكلة فـ...'
                            editable={true}
                        />

                        <Text style={styles.label}> محتوي الرسالة </Text>
                        <TextInput
                            style={styles.input}
                            value={Message}
                            onChangeText={setMessage}
                            placeholder='ادخل محتوي الرسالة....'
                            multiline={true}
                            editable={true}
                        />

                    </View>

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            height: scale(50),
                            backgroundColor: '#036E65',
                            borderRadius: scale(100),
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: scale(40),
                        }}
                        onPress={() => {
                            // Handle send message action
                            if (Title === '' || Message === '') {
                                alert('يرجى ملئ جميع الحقول')
                                return
                            }
                            // Here you can add your API call to send the message
                            alert('تم ارسال الرسالة بنجاح')
                            router.back()
                        }}
                    >
                        <Text style={{
                            fontSize: scale(16),
                            fontFamily: 'Almarai',
                            fontWeight: '700',
                            color: '#fff',
                        }}>
                            ارسال
                        </Text>
                    </TouchableOpacity>


                </ScrollView>

            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default HelpCenter

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
    header: {
        fontSize: scale(32),
        fontWeight: 'bold',
        marginBottom: scale(8),
        fontFamily: 'Almarai',
        textAlign: 'right',
        width: '100%',
    },
    subHeader: {
        fontSize: scale(14),
        fontWeight: 'normal',
        marginBottom: scale(14),
        fontFamily: 'Almarai',
        textAlign: 'right',
        lineHeight: scale(20),
        width: '100%',
        color: '#878787',
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
        marginVertical: scale(10),

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
        color: '#cdcdcd',
    },

})