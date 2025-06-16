import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { scale } from 'react-native-size-matters';
import PaymentCard from './payment';
import { router } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import BgPattern from '@/assets/svg/Pattern';

const plans = [
    { id: 1, name: 'الاساسية', price: 19, deliveryLimit: 5 },
    { id: 2, name: 'المتوسطة ', price: 49, deliveryLimit: 15 },
    { id: 3, name: 'الخاصة', price: 99, deliveryLimit: ' غير محدود ' },
];

const MarketPlans = () => {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [pay, setPay] = useState(false);

    const handleSelectPlan = (plan: any) => {
        setSelectedPlanId(plan.id);
        // TODO: send to backend (e.g., via fetch or Axios)
        console.log(`Selected plan: ${plan.name}`);
    };

    const renderPlan = ({ item }: { item: typeof plans[0] }) => (
        <TouchableOpacity
            style={[
                styles.planCard,
                selectedPlanId === item.id && styles.selectedCard,
            ]}
            onPress={() => handleSelectPlan(item)}
        >
            <Text style={styles.planTitle}>{item.name}</Text>
            <Text style={styles.planInfo}>
                عدد المناديب :
                {item.deliveryLimit}</Text>
            <Text style={styles.planPrice}>${item.price}/شهر</Text>
            <View style={styles.selectButton}>
                <Text style={styles.selectButtonText}>
                    {selectedPlanId === item.id ? 'تم الاختيار' : 'اختار الخطة'}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeContainer}>

            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>


            {/* <Text style={styles.header}>اختيار الباقة</Text> */}
            {/* Page Title */}
            <View style={styles.pageTitle}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#333" />
                </TouchableOpacity>
                <Text style={styles.pageTitleText}>
                    اختيار الباقة
                </Text>
                <View style={styles.dummyView} />
            </View>


            <FlatList
                data={plans}
                style={styles.FlatList}
                renderItem={renderPlan}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />

            <TouchableOpacity style={{ width: '90%' }} onPress={() => setPay(true)}>
                <View style={styles.confirmBtn}>
                    <Text style={styles.comfirmTxt}>تأكيد الاختيار</Text>
                </View>
            </TouchableOpacity>

            <PaymentCard
                isVisible={pay}
                onPress={() => setPay(false)}
            />

        </SafeAreaView>
    );
};

export default MarketPlans;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    header: {
        fontFamily: 'almarai',
        lineHeight: scale(30),
        fontSize: scale(20),
        fontWeight: 'bold',
        marginBottom: scale(20),
        textAlign: 'center',
    },
    list: {
        gap: 16,
    },
    planCard: {
        padding: 20,
        borderRadius: 10,

        borderWidth: 1,
        borderColor: '#ccc',
        width: '100%',

        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    selectedCard: {
        backgroundColor: '#F8FFF0',
        borderColor: '#036E65',
    },
    planTitle: {
        fontFamily: 'almarai',
        lineHeight: scale(26),

        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
    },
    planInfo: {
        fontFamily: 'almarai',

        fontSize: 14,
        lineHeight: scale(22),

        marginBottom: 8,
    },
    planPrice: {
        fontFamily: 'almarai',
        lineHeight: scale(24),
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 10,
    },
    selectButton: {
        width: '100%',
        backgroundColor: '#036E65',
        paddingVertical: 8,
        borderRadius: 6,
        alignItems: 'center',
    },
    selectButtonText: {
        fontFamily: 'almarai',
        lineHeight: scale(24),
        color: '#fff',
        fontWeight: '600',
    },
    FlatList: {
        width: '95%',
        paddingHorizontal: scale(20),
    },
    confirmBtn: {
        width: '100%',
        backgroundColor: '#036E65',
        paddingVertical: scale(12),
        borderRadius: scale(16),
        alignItems: 'center',
        marginTop: scale(20),
    },
    comfirmTxt: {
        fontFamily: 'almarai',
        lineHeight: scale(24),
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        padding: scale(4),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    pageTitle: {
        width: '100%',
        height: scale(40),
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: scale(10),
        paddingHorizontal: scale(24),

    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold',
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8),
    },
});


// '#036E65',4F9993