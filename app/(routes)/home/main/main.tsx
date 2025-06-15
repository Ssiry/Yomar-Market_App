import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { scale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';
import NavBar from '@/components/elements/NavBar';
import BgPattern from '@/assets/svg/Pattern';
import { router } from 'expo-router';

import FontistoIcon from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/Feather';
import CurrentOrders from './currentOrders';
import WorkingOnOrders from './workingOnOrders';

const headerData = [
    {
        id: 1, title: "نقداً",
        icon: <FontAwesome6Icon name={'hand-holding-dollar'} color={'#036E65'} size={scale(30)} />,
        value: 50
    },
    {
        id: 2, title: "الطلبات",
        icon: <Icon2 name={'box'} color={'#036E65'} size={scale(30)} />,
        value: 33
    },
    {
        id: 3, title: "الايرادات",
        icon: <Icon name={'attach-money'} color={'#036E65'} size={scale(30)} />,
        value: 500
    },
    {
        id: 4, title: "شبكة",
        icon: <FontistoIcon name={'shopping-pos-machine'} color={'#036E65'} size={scale(30)} />,
        value: 450
    },

]



// الطلبات ، المبيعات ، الهدف 

const Main = () => {
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {/* nav-bar header */}
                <NavBar />


                <View style={[styles.AnalyticsRowContainer]}>

                    {headerData.map((item) => (
                        <View key={item.id} style={[styles.AnalyticsItem]} >
                            <View style={[styles.itemHeader]}>
                                <Text style={[styles.itemText, { fontSize: scale(16) }]}>
                                    {item.title}
                                </Text>
                                {item.icon}
                            </View>
                            <Text style={[styles.itemText, { fontSize: scale(18) }]}>{item.value}</Text>

                        </View>
                    ))}
                </View>

                {/* Current orders */}
                <View style={[{ width: '100%', alignItems: 'center', justifyContent: 'center', marginBottom: scale(10) }]}>


                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>
                            الطلبات الحالية
                        </Text>
                        <View style={styles.separatorLine} />
                    </View>
                    <CurrentOrders />
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>
                        الطلبات قيد التنفيذ
                    </Text>
                    <View style={styles.separatorLine} />
                </View>

                <WorkingOnOrders />

            </ScrollView>
        </SafeAreaView>
    );
};

export default Main;

const styles = StyleSheet.create({
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    scrollView: { width: '100%', height: '100%', marginBottom: scale(-30) },

    iconButton: { backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', },

    AnalyticsContainer: { width: '100%', display: "flex", justifyContent: "center", alignItems: "center", },

    AnalyticsRowContainer: {
        paddingVertical: scale(10),
        width: '100%', backgroundColor: "#fff", borderRadius: scale(8), display: "flex", flexWrap: 'wrap', justifyContent: "space-between",
        gap: scale(15), paddingHorizontal: scale(10), alignItems: "flex-start", flexDirection: "row",
    },

    AnalyticsItem: {
        width: '45%',
        height: scale(90),
        backgroundColor: "#E6F0F0",
        borderRadius: scale(12),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: scale(10),
        padding: scale(10),
    },
    itemHeader: {
        width: '100%', height: scale(40), backgroundColor: "#fff", borderRadius: scale(8),
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexDirection: 'row-reverse', gap: scale(6),
        paddingHorizontal: scale(10),
    },
    itemText: { fontFamily: "Almarai", fontWeight: '600', textAlign: 'right', lineHeight: scale(20), color: "#036E65" },


    separatorContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginVertical: scale(10),
    },
    separatorLine: {
        width: scale(100),
        height: 2,
        backgroundColor: "#036E65",
        marginHorizontal: scale(8)
    },
    separatorText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        height: scale(20),
        color: "#036E65",
    },

});
