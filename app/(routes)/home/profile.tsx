import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'

const Profile = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>

            <View>
                <Text>Hi Profile</Text>

            </View>




            {/* <Text>home</Text> */}
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
})