import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
// import MapWithMarkers from '@/components/elements/mapView'

const Profile = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <View>
                <Text>

                    صفحة الحساب

                </Text>
                {/* <MapWithMarkers /> */}

            </View>




            {/* <Text>home</Text> */}
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',
    },
})