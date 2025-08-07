import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const Description = ({ description }: { description: string }) => {
    return (
        <View style={styles.view1}>
            <Text style={styles.title}>الوصف</Text>

            <Text style={styles.description}>
                {description}
            </Text>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({
    view1: { width: '100%', borderTopWidth: scale(1), borderBottomWidth: scale(1), borderTopColor: '#C0DBD8', borderBlockColor: '#C0DBD8', paddingVertical: 20, paddingHorizontal: 10 },
    title: { textAlign: 'right', fontSize: scale(16), fontWeight: '800', fontFamily: 'Almarai', color: '#036E65' },
    description: { textAlign: 'right', fontSize: scale(12), fontWeight: '400', fontFamily: 'Almarai', color: '#878787', lineHeight: scale(20), marginTop: 10 },

})