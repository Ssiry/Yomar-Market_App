import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'

interface DeleteProductModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteProductModal = ({ visible, onConfirm, onCancel }: DeleteProductModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <Icon name="trash" size={scale(58)} color="#fff" style={styles.icon} />

                    <Text style={styles.title}>
                        حذف المنتج                    </Text>

                    <Text style={styles.subTitle}>
                        هل انت متاكد من حذف المنتج ؟
                    </Text>

                    <View style={styles.buttonContainer}>


                        <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                            <Text style={styles.confirmText}>نعم (حذف المنتج)</Text>
                        </TouchableOpacity>



                        <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
                            <Text style={styles.cancelText}>لا</Text>
                        </TouchableOpacity>


                    </View>

                </View>
            </View>
        </Modal>
    )
}

export default DeleteProductModal

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
        backgroundColor: '#e74c3c',

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
        color: '#878787',
        textAlign: 'center',
        // marginBottom: scale(20),
        fontFamily: 'Almarai',
        width: '100%',
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

    },
    confirmButton: {
        backgroundColor: '#e74c3c',
    },
    cancelButton: {
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
