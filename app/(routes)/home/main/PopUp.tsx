import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface PopUpProps {
    // icon: string | React.ReactNode;
    view1: React.ReactNode;
    view2: React.ReactNode;
    // title: string;
    // subtitle: string;
    btnText: string;

    isVisible?: boolean;






    onPress: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ view1, view2, btnText, isVisible, onPress }) => {
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
                            {view1}
                        </View>
                        <View style={[styles.iconContainer, { backgroundColor: 'transparent' }]}>
                            {view2}
                        </View>

                        <View style={[styles.btnContainer]}>


                            <TouchableOpacity style={[styles.button, { borderRadius: scale(50), width: '100%' }]} onPress={() => {
                                onPress();
                            }}>
                                <Text style={styles.buttonText}>{btnText}</Text>
                            </TouchableOpacity>
                        </View>

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
        width: '90%',
        backgroundColor: 'white',
        borderRadius: scale(25),
        paddingVertical: scale(20),
        gap: scale(10),
        paddingHorizontal: scale(20),
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconContainer: {
        width: "100%",
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
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: scale(20),
    },
    button: {
        backgroundColor: '#00695C',
        borderRadius: scale(15),
        paddingVertical: scale(12),
        paddingHorizontal: scale(12),
    },
    buttonText: {
        color: '#fff',
        fontSize: scale(12),
        fontFamily: 'Almarai',
        textAlign: 'center',
        lineHeight: scale(22),
        fontWeight: '600',
        marginHorizontal: scale(30),
    },

});

export default PopUp;