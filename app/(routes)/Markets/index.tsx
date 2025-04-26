import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MarketsMap from './MarketsMap'
import { SafeAreaProvider } from 'react-native-safe-area-context'

const index = () => {
    return (
        <View style={{ width: "100%", height: "100%" }}>
            <SafeAreaProvider>
                <MarketsMap />

            </SafeAreaProvider>
        </View>
    )
}

export default index

const styles = StyleSheet.create({})