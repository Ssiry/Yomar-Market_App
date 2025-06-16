import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import { router } from 'expo-router'
import Icon from 'react-native-vector-icons/Ionicons'
// import CurrentOrders from './currentOrders'
import LastOrders from './LastOrders'
import CategoryBar from './CategoryBar'
import CurrentOrders from './currentOrders'
import WorkingOnOrders from './workingOnOrders'
import Waitting from './Waitting'


// const orders = [
//     { id: 'DSERC-76618-717', status: 'تم توصيل الطلب', shop: 'متجر السعدي', total: '37.00', delivery: 'مجانا', discount: '1.00', items: '4.0' },
//     // Add more if needed
// ];

const Orders = () => {
    const [selectedCategory, setSelectedCategory] = useState('المعلقة');
    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollcontent}
            >
                {/* 
                MARK:- Current Orders
                */}

                <View style={styles.pageTitle}>

                    <View style={styles.dummyView} />


                    <Text style={styles.pageTitleText}>
                        الطلبات
                    </Text>

                    <View style={styles.dummyView} />
                </View>

                {/* <View style={styles.separatorContainer}>
                    <View style={styles.separatorLine} />
                    <Text style={styles.separatorText}>
                        الطلبات الحالية
                    </Text>
                    <View style={styles.separatorLine} />
                </View>

                <CurrentOrders /> */}

                <View style={{ width: '100%', height: scale(55), justifyContent: 'center', alignItems: 'center', marginTop: scale(10) }}>
                    <CategoryBar
                        categories={['الحالية', 'تم التوصيل']}
                        onCategorySelect={(cat) => setSelectedCategory(cat)}
                        initialSelected="الحالية"
                    />
                </View>








                {/* MARK:- Last Orders
                 */}

                {selectedCategory === 'الحالية' && <View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>
                            قيد التوصيل
                        </Text>
                        <View style={styles.separatorLine} />
                    </View>


                    <CurrentOrders />

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>
                            قائمة الانتظار
                        </Text>
                        <View style={styles.separatorLine} />
                    </View>

                    <Waitting />


                    {/* <LastOrders /> */}
                </View>
                }
                {/* 
                {selectedCategory === 'قيد التوصيل' && <View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>
                            قيد التوصيل
                        </Text>
                        <View style={styles.separatorLine} />
                    </View>


                    <CurrentOrders />
                </View>
                } */}

                {selectedCategory === 'تم التوصيل' && <View>

                    <View style={styles.separatorContainer}>
                        <View style={styles.separatorLine} />
                        <Text style={styles.separatorText}>
                            تم التوصيل
                        </Text>
                        <View style={styles.separatorLine} />
                    </View>


                    {/* <CurrentOrders /> */}
                    <LastOrders />
                </View>
                }







            </ScrollView>
        </SafeAreaView>
    )
}

export default Orders

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(24),
        backgroundColor: '#fff',

    },
    scrollView: {
        width: '100%',
        height: '100%',
        marginBottom: scale(-30),
    },
    scrollcontent: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold'
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
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    separatorContainer: {
        flexDirection: "row",
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        marginTop: scale(20),
        marginBottom: scale(10),
    },
    separatorLine: {
        width: scale(50),
        height: 3,
        backgroundColor: "#036E65",
        opacity: 0.5,
        marginHorizontal: scale(8)
    },
    separatorText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        height: scale(20),
        fontWeight: 'bold',
        color: "#036E65",
        opacity: 0.5,

    },
})