import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

const Favourite = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>


            <View>
                <Text>Hi Fav</Text>

            </View>




            {/* <Text>home</Text> */}
        </SafeAreaView>
    )
}

export default Favourite

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
})