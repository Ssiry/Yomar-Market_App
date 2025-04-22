import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

const Cart = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>


            <View>
                <Text>Hi Cart</Text>

            </View>




            {/* <Text>home</Text> */}
        </SafeAreaView>
    )
}

export default Cart

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
})