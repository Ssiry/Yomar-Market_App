import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    I18nManager,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

I18nManager.forceRTL(true);

interface PopUpProps {
    icon: string | React.ReactNode;
    title: string;
    subtitle: string;
    btnText: string;

    isVisible?: boolean;



    onPress: () => void;
}

const PopUP: React.FC<PopUpProps> = ({ icon, title, subtitle, btnText, isVisible, onPress }) => {
    const [, setVisible] = useState(true);

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
                        {/* Icon */}
                        <View style={styles.iconContainer}>


                            {icon && typeof icon === 'string' ? (
                                <Icon name={icon} color='#000' size={scale(24)} />
                            ) : (
                                icon
                            )}

                        </View>

                        {/* Title */}
                        <Text style={styles.title}>
                            {title}

                        </Text>

                        {/* Description */}
                        <Text style={styles.description}>
                            {subtitle}
                        </Text>

                        {/* Button */}
                        <TouchableOpacity style={styles.button} onPress={() => { onPress(); setVisible(false); }}>
                            <Text style={styles.buttonText}>{btnText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: scale(25),
        paddingVertical: scale(30),
        paddingHorizontal: scale(20),
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#E8F5E9',
        borderRadius: scale(50),
        padding: scale(12),
        marginBottom: scale(20),
    },
    icon: {
        width: scale(40),
        height: scale(40),
        tintColor: '#00695C',
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#000',
        textAlign: 'center',
        lineHeight: scale(26),
        fontFamily: 'Almarai',
        marginBottom: scale(10),
    },
    description: {
        fontSize: scale(14),
        color: '#444',
        textAlign: 'center',
        marginBottom: scale(25),
        fontFamily: 'Almarai',
        lineHeight: scale(22),
    },
    button: {
        backgroundColor: '#00695C',
        borderRadius: scale(15),
        paddingVertical: scale(12),
        paddingHorizontal: scale(40),
    },
    buttonText: {
        color: '#fff',
        fontSize: scale(14),
        fontFamily: 'Almarai',
        textAlign: 'center',
        lineHeight: scale(22),
        fontWeight: '600',
    },
});

export default PopUP;