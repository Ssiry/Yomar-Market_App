import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Main = () => {
    // State to manage the selected category
    const [name, setName] = useState<string>('')
    const [numOfOrder, setNumOfOrder] = useState<number>(0)
    const [sales, setSales] = useState<number>(0)
    const [target, setTarget] = useState<number>(0)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');



    // Function to handle category selection

    const handleUpdateTarget = async (newTarget: number) => {
        try {
            const token = await AsyncStorage.getItem('market/token');


            const response = await axios.post(
                'http://192.168.1.11:5007/market/home/update-target',
                { target: newTarget },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            Alert.alert('تم التحديث', response.data.message);
            console.log('✅ Market updated:', response.data.market);

        } catch (error) {
            console.error('❌ Error updating target:', error);
            Alert.alert('فشل التحديث', 'حدث خطأ أثناء تحديث الهدف');
        }
    };


    // useEffect to fetch initial data or perform any setup if needed
    useEffect(() => {
        const fetchMarketInfo = async () => {
            try {
                const token = await AsyncStorage.getItem('market/token');


                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://192.168.1.11:5007/market/home/market-info', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = response.data;

                setName(data.name || '');
                setNumOfOrder(data.numOfOrder || 0);
                setSales(data.sales || 0);
                setTarget(data.target || 0);

            } catch (err) {
                console.error('Error fetching market info:', err);
                setError('Failed to fetch market info');
            } finally {
                setLoading(false);
            }
        };

        fetchMarketInfo();
    }, []);

    // Render the component
    if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
    if (error) return <Text>{error}</Text>;

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
                <NavBar name={name} />






                <View style={[styles.AnalyticsRowContainer]}>

                    <View style={[styles.AnalyticsItem]} >
                        <View style={[styles.itemHeader,]}>
                            <Text style={[styles.itemText, { fontSize: scale(16) }]}>
                                المبيعات
                            </Text>
                            <Icon name={'attach-money'} color={'#036E65'} size={scale(30)} />
                        </View>
                        <Text style={[styles.itemText, { fontSize: scale(18) }]}>
                            {sales}
                        </Text>
                    </View>

                    <View style={[styles.AnalyticsItem]} >

                        <View style={[styles.itemHeader]}>
                            <Text style={[styles.itemText, { fontSize: scale(16) }]}>
                                الطلبات
                            </Text>
                            <Icon2 name={'box'} color={'#036E65'} size={scale(30)} />
                        </View>
                        <Text style={[styles.itemText, { fontSize: scale(18) }]}>
                            {numOfOrder}
                        </Text>

                    </View>

                    <View style={[styles.AnalyticsItem, styles.target]} >
                        <View style={[styles.itemHeader, { width: '50%' }]}>
                            <Text style={[styles.itemText, { fontSize: scale(16) }]}>
                                الهدف
                            </Text>
                            <FontAwesome6Icon name={'hand-holding-dollar'} color={'#036E65'} size={scale(30)} />
                        </View>

                        <TextInput
                            style={[styles.itemText, { width: '27%', textAlign: 'center' }, {
                                backgroundColor: '#fff',
                                padding: scale(8),
                                borderRadius: scale(8),
                                fontSize: scale(18)
                            }]}
                            value={String(target)}
                            onChangeText={(text) => setTarget(Number(text))}
                            keyboardType="numeric"
                            maxLength={6}
                            placeholder="أدخل الهدف"
                            placeholderTextColor="#878787"
                        />

                        <TouchableOpacity
                            onPressIn={() => handleUpdateTarget(target)}
                            style={styles.iconButton}
                        >
                            <FontistoIcon
                                name="check"
                                size={scale(20)}
                                color="#036E65"
                            />
                        </TouchableOpacity>

                    </View>



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
        gap: scale(10), paddingHorizontal: scale(10), alignItems: "flex-start", flexDirection: "row",
    },

    AnalyticsItem: {
        width: '48%',
        height: scale(90),
        backgroundColor: "#E6F0F0",
        borderRadius: scale(12),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row-reverse",
        flexWrap: 'wrap',
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
    target: { width: '100%', height: 'auto', alignContent: 'space-between', justifyContent: 'space-between' },

});
