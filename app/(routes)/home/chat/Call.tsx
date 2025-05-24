import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/Ionicons'

interface CallModalProps {
    visible: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const Call = ({ visible, onConfirm, onCancel }: CallModalProps) => {
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
                                خيارات الاتصال
                            </Text>
                            <Text style={styles.subTitle}>
                                نظرا لخصوصيات العميل يمكنك التواصل مع العميل
                                مباشرة من الجوال
                            </Text>
                        </View>
                    </View>



                    {/* Row */}
                    <View style={[{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: scale(20),

                        paddingHorizontal: scale(8),
                        paddingVertical: scale(8),

                        borderWidth: scale(1),
                        borderColor: '#E5E5E5',
                        borderRadius: scale(8),

                    }]}>

                        <Icon name="call" size={scale(20)} color="#036E65" style={{
                            padding: scale(10),
                            borderRadius: scale(5),
                            backgroundColor: '#F5F5FF',
                        }} />

                        {/* <TouchableOpacity onPress={onConfirm} style={[styles.button, { backgroundColor: '#e74c3c' }]}> */}

                        <Text style={[styles.confirmText, { color: '#000', fontSize: scale(20), fontWeight: 'normal' }]}>
                            +966 555 333 123
                        </Text>

                        {/* </TouchableOpacity> */}
                    </View>


                    <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
                        <Text style={styles.confirmText}>
                            اتصال الان
                        </Text>
                    </TouchableOpacity>


                </View>
            </View>
        </Modal>
    )
}

export default Call

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
        // marginBottom: scale(20),
        marginTop: scale(10),
        fontFamily: 'Almarai',
        // width: '100%',
        lineHeight: scale(20),
        // paddingHorizontal: scale(20),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
        // paddingRight: scale(20),
        gap: scale(10),

        // marginTop: scale(10),
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
    },
    // cancelText: {
    //     color: '#333',
    //     fontWeight: 'bold',

    //     textAlign: 'center',
    //     fontFamily: 'Almarai',
    //     fontSize: scale(14),
    // },
})
