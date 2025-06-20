import BgPattern from '@/assets/svg/Pattern';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';
import Call from './Call';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: '1', text: 'مرحبًا بك في الدردشة!', sender: 'other' },
    ]);
    const [input, setInput] = useState('');
    const [call, setCall] = useState(false);

    const handleSend = () => {
        if (input.trim() === '') return;
        const newMessage = {
            id: Date.now().toString(),
            text: input,
            sender: 'me',
        };
        setMessages([newMessage, ...messages]);
        setInput('');
    };

    const renderItem = ({ item }: { item: { id: string; text: string; sender: string } }) => (
        <View
            style={[
                styles.message,
                item.sender === 'me' ? styles.myMessage : styles.otherMessage,
            ]}
        >
            <Text style={item.sender === 'me' ? styles.myMessageText : styles.otherMessageText}>{item.text}</Text>
        </View>
    );

    const handleCellularCall = async (phoneNumber: any) => {
        if (!phoneNumber) {
            Alert.alert("Error", "Phone number is not available.");
            return;
        }

        const url = `tel:${phoneNumber}`;

        try {
            const supported = await Linking.canOpenURL(url);

            if (supported) {
                await Linking.openURL(url);
            } else {
                Alert.alert("Error", "This device cannot make phone calls.");
            }
        } catch (error) {
            Alert.alert("Error", "An unexpected error occurred when trying to make the call.");
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <View style={styles.pageTitle}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()} >
                    <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                </TouchableOpacity>

                <Text style={styles.pageTitleText}>
                    اسم العميل

                    <Text
                        style={{
                            fontFamily: 'Almarai',
                            fontSize: scale(12),
                            fontWeight: '400',
                            color: '#036E65',
                            textAlign: 'right',
                            lineHeight: scale(20),
                        }}
                    >
                    </Text>
                </Text>

                <TouchableOpacity style={styles.iconButton} onPress={() => { setCall(true) }} >
                    <Icon name="call-outline" size={scale(24)} color="#333" />
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            // keyboardVerticalOffset={scale(80)}
            >
                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    inverted
                    contentContainerStyle={styles.messageList}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />

                <View style={styles.inputContainer}>
                    <TextInput
                        value={input}
                        onChangeText={setInput}
                        placeholder="اكتب رسالتك..."
                        style={styles.textInput}
                        placeholderTextColor="#aaa"
                    />
                    <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
                        <Icon name="send" size={scale(20)} color="#fff" />
                    </TouchableOpacity>


                    {/* 
                    
                    */}

                    <Call
                        visible={call}
                        onConfirm={() => handleCellularCall('+966555333123')}
                        // make a cellular call
                        // Linking.openURL(`tel:${'+966555333123'}`);
                        // ; setCall(false)

                        onCancel={() => { setCall(false) }}
                    />


                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: scale(16),
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
        textAlign: 'center',
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
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    messageList: {
        paddingVertical: scale(10),
    },
    message: {
        maxWidth: '80%',
        padding: scale(10),
        borderRadius: scale(10),
        marginVertical: scale(4),
    },
    myMessage: {
        backgroundColor: '#036E65',
        color: '#fff',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#F0F0F0',
        alignSelf: 'flex-start',
    },
    myMessageText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#fff',
    },
    otherMessageText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#333',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ddd',
        paddingVertical: scale(8),
        paddingHorizontal: scale(12),
        backgroundColor: '#fff',
    },
    textInput: {
        flex: 1,
        height: scale(40),
        borderRadius: scale(20),
        paddingHorizontal: scale(12),
        backgroundColor: '#f3f3f3',
        fontFamily: 'Almarai',
        fontSize: scale(14),
        color: '#333',
        textAlign: 'right',
    },
    sendButton: {
        marginLeft: scale(8),
        backgroundColor: '#036E65',
        borderRadius: scale(20),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(12),
    },
});
