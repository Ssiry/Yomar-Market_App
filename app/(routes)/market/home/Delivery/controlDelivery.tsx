import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

interface ControlDeliveryModalProps {
    visible: boolean;
    onDelete: () => void;
    onCancel: () => void;
}

const ControlDeliveryModal = ({ visible, onDelete, onCancel }: ControlDeliveryModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <Icon name="ellipsis-horizontal-circle" size={scale(58)} color="#333" style={styles.icon} />

                    <Text style={styles.title}>
                        تحكم بالمندوب
                    </Text>

                    <View style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: scale(10) }}>

                        <TouchableOpacity
                            onPress={onDelete}
                            style={[styles.btn]}>

                            <Text style={styles.subTitle}>
                                حذف المندوب
                            </Text>

                            <Icon name="trash-outline" size={scale(24)} color="#e74c3c" />

                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn]}>
                            <Text style={styles.subTitle}>
                                تعطيل المندوب
                            </Text>

                            <FontAwesome5Icon name="toggle-off" size={scale(24)} color="#333" />

                        </TouchableOpacity>
                    </View>


                    <View style={styles.buttonContainer}>

                        {/* 

                        <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                            <Text style={styles.confirmText}>تاكيد</Text>
                        </TouchableOpacity> */}



                        <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.cancelText}>اغلاق</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default ControlDeliveryModal

const styles = StyleSheet.create({
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
        paddingVertical: scale(30),
        paddingHorizontal: scale(20),
        alignItems: 'center',


        display: 'flex',
        flexDirection: 'column',
        gap: scale(20),
        alignContent: 'center',
        justifyContent: 'center',

    },
    icon: {
        // position: 'absolute',
        // top: scale(15),
        // right: scale(15),

        padding: scale(20),
        borderRadius: scale(50),
        backgroundColor: '#e5e5e5',

    },
    btn: {
        borderRadius: scale(12),
        backgroundColor: '#f0f0f0',
        padding: scale(10),
        width: '100%',
        display: 'flex',
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginBottom: scale(20),
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        // marginBottom: scale(20),
        fontFamily: 'Almarai',
        width: '100%',
    },
    subTitle: {
        fontSize: scale(14),
        color: '#333',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Almarai',
        lineHeight: scale(20),
    },
    buttonContainer: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        width: '100%',
        // marginTop: scale(10),
    },
    button: {

        paddingVertical: scale(15),
        paddingHorizontal: scale(30),
        borderRadius: scale(100),
        width: '100%',

    },
    confirmButton: {
        backgroundColor: '#e74c3c',
        width: '48%',
    },
    cancelButton: {
        width: '100%',

        backgroundColor: '#bdc3c7',
    },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Almarai',
        fontSize: scale(14),
    },
    cancelText: {
        color: '#333',
        fontWeight: 'bold',

        textAlign: 'center',
        fontFamily: 'Almarai',
        fontSize: scale(14),
    },
})
