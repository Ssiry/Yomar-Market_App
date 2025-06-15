import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'

interface AddModalProps {
    visible: boolean;
    onCategoryConfirm: () => void;
    onProductConfirm: () => void;
    onCancel: () => void;
}

const Add = ({ visible, onCategoryConfirm, onProductConfirm, onCancel }: AddModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
        >
            <View style={styles.overlay}>
                <View style={styles.modal}>

                    <View style={styles.buttonContainer}>

                        <TouchableOpacity onPress={onCancel} >
                            <Icon name="close" size={scale(20)} color="#fff" style={styles.icon} />
                        </TouchableOpacity>

                        <View style={{
                            flex: 1,

                        }}>

                            <Text style={styles.title}>
                                خيارات الاضافة
                            </Text>
                            <Text style={styles.subTitle}>
                                يمكنك اضافة قسم داخل  متجرك او اضافة منتج جديد
                            </Text>
                        </View>
                    </View>



                    {/* Row */}
                    <TouchableOpacity style={[styles.Row, { marginBottom: scale(-8) }]} onPress={onCategoryConfirm} >

                        <Icon name="add-circle-outline" size={scale(20)} color="#333" style={{
                            padding: scale(10),
                            borderRadius: scale(5),
                            backgroundColor: '#F5F5FF',
                        }} />

                        <Text style={[styles.confirmText, { color: '#000', fontSize: scale(16), fontWeight: 'normal' }]}>
                            اضافة قسم جديد
                        </Text>

                    </TouchableOpacity>

                    {/* Row */}
                    <TouchableOpacity style={[styles.Row, { marginBottom: scale(8) }]} onPress={onProductConfirm}>

                        <Icon name="add-circle-outline" size={scale(20)} color="#333" style={{
                            padding: scale(10),
                            borderRadius: scale(5),
                            backgroundColor: '#F5F5FF',
                        }} />

                        <Text style={[styles.confirmText, { color: '#000', fontSize: scale(16), fontWeight: 'normal' }]}>
                            اضافة منتج جديد
                        </Text>

                    </TouchableOpacity>


                    {/* 
                    <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                        <Text style={styles.confirmText}>
                             الان
                        </Text>
                    </TouchableOpacity> */}


                </View>
            </View>
        </Modal>
    )
}

export default Add

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    modal: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: scale(25),
        paddingVertical: scale(30),
        paddingHorizontal: scale(20),
        alignItems: 'center',

        display: 'flex',
        flexDirection: 'column',
        gap: scale(15),
        alignContent: 'center',
        justifyContent: 'center',
    },
    icon: {

        padding: scale(5),
        borderRadius: scale(7),
        backgroundColor: '#e74c3c',

    },
    title: {
        fontSize: scale(20),
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'right',
        lineHeight: scale(30),
        fontFamily: 'Almarai',
    },
    subTitle: {
        fontSize: scale(14),
        color: '#878787',
        textAlign: 'right',
        marginTop: scale(10),
        fontFamily: 'Almarai',
        lineHeight: scale(20),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        gap: scale(10),
    },
    button: {

        paddingVertical: scale(15),
        paddingHorizontal: scale(30),
        borderRadius: scale(100),

    },
    confirmButton: {
        backgroundColor: '#036E65',
        width: '100%',
        marginBottom: scale(10),
    },
    // cancelButton: {
    //     backgroundColor: '#bdc3c7',
    // },
    confirmText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Almarai',
        fontSize: scale(14),
        lineHeight: scale(20),

    },


    Row: {
        width: '100%',
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: scale(20),
        paddingHorizontal: scale(8),
        paddingVertical: scale(8),
        borderWidth: scale(1),
        borderColor: '#E5E5E5',
        borderRadius: scale(8),

    },

})
