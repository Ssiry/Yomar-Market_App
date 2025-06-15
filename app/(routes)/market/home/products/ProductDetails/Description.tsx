import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'

const Description = () => {
    return (
        <View style={{ width: '100%', borderTopWidth: scale(1), borderBottomWidth: scale(1), borderTopColor: '#C0DBD8', borderBlockColor: '#C0DBD8', paddingVertical: 20, paddingHorizontal: 10 }}>
            <Text style={{ textAlign: 'right', fontSize: scale(16), fontWeight: '800', fontFamily: 'Almarai', color: '#036E65' }}>الوصف</Text>
            <Text style={{ textAlign: 'right', fontSize: scale(12), fontWeight: '400', fontFamily: 'Almarai', color: '#878787', lineHeight: scale(20), marginTop: 10 }}>
                منتج غذائي عالي الجودة، يحتوي على مكونات طبيعية وصحية. مثالي للاستخدام اليومي في الطهي أو كوجبة خفيفة. يتميز بنكهته اللذيذة وقيمته الغذائية العالية.
                مناسب لجميع أفراد الأسرة. احصل على تجربة طعام مميزة مع هذا المنتج الرائع.
            </Text>
        </View>
    )
}

export default Description

const styles = StyleSheet.create({})