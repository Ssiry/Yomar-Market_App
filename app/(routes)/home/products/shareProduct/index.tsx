import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Clipboard, Alert, Platform } from 'react-native';
import * as ClipboardModule from 'expo-clipboard';

interface ShareProductProps {
    productId: string;
}

const ShareProduct = ({ productId }: ShareProductProps) => {
    const [copied, setCopied] = useState(false);

    const shareUrl = `https://yourdomain.com/product/${productId}`;
    // const shareUrl = `https://yourdomain.com/category/${categoryId}`;

    const copyToClipboard = async () => {
        await ClipboardModule.setStringAsync(shareUrl);
        setCopied(true);
        Alert.alert('Copied!', 'Link has been copied to clipboard.');
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Share this product</Text>
            <View style={styles.row}>
                <TextInput
                    style={styles.input}
                    value={shareUrl}
                    editable={false}
                    selectTextOnFocus
                />
                <TouchableOpacity onPress={copyToClipboard} style={styles.button}>
                    <Text style={styles.buttonText}>{copied ? 'Copied!' : 'Copy'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ShareProduct;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 20,
        borderRadius: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: '600',
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#aaa',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 8,
        fontSize: 14,
        marginRight: 8,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '500',
    },
});
