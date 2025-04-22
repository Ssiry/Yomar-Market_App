import { StyleSheet, Text, Touchable, View, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'
import Banner from '@/components/elements/Banner'
import Icon from 'react-native-vector-icons/MaterialIcons'
import SearchIcon from 'react-native-vector-icons/Ionicons'

const main = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>

            <ScrollView style={{ width: '100%', height: '100%' }} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>

                {/* nav-bar header */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingVertical: scale(10) }}>

                    {/* Left */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        {/* icon */}
                        {/* <Text>location-history</Text> */}
                        <Icon name='location-history' size={scale(36)} color={'#036E65'} />
                        {/* text */}
                        <View style={{ marginLeft: scale(4), display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(12), fontWeight: "700", color: '#036E65', marginBottom: scale(4), marginTop: scale(4) }}>
                                حسن عسيري
                            </Text>
                            <Text style={{ fontFamily: 'Almarai', fontSize: scale(10), fontWeight: "300", color: '#036E65', height: scale(20) }}>

                                1234 شارع الملك عبد العزيز
                            </Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: scale(8) }}>

                        <TouchableOpacity
                            style={{ backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center' }}
                        >
                            <SearchIcon name="search" size={scale(24)} color={'#036E65'} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center' }}
                        >
                            <SearchIcon name="notifications" size={scale(24)} color={'#036E65'} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* search modal & notification */}

                {/* banner */}
                <Banner />
                {/* category bar */}
                <ScrollView style={styles.scroll
                } horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", width: '100%', height: scale(50), marginTop: scale(16), backgroundColor: "green", }}>
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(4) }} />
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(4) }} />
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(4) }} />
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(4) }} />
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(4) }} />
                        <View style={{ backgroundColor: "red", width: scale(100), height: (40), marginRight: scale(0) }} />
                    </View>
                </ScrollView>

                {/* navigate on map */}
                {/* mini map view */}


                <View>
                    <Text>Hi Main</Text>

                </View>




                {/* <Text>home</Text> */}
            </ScrollView>
        </SafeAreaView>
    )
}

export default main

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        overflowX: 'visible',
        backgroundColor: '#fff',
    },
    scroll: { width: '100%', height: scale(50), marginTop: scale(16), backgroundColor: "green", }



})