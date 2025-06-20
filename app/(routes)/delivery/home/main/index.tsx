import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BgPattern from '@/assets/svg/Pattern'
import { scale } from 'react-native-size-matters'
import NavBar from '@/components/elements/NavBar'
import CategoryBar from './CategoryBar'
import { SafeAreaView } from 'react-native-safe-area-context'
import CurrentOrders from '@/app/(routes)/delivery/home/orders/currentOrders'
import Waitting from '@/app/(routes)/delivery/home/orders/Waitting'
import DeliveryNotFound from '@/assets/svg/DeliveryNotFound'

const index = () => {
    const [selectedCategory, setSelectedCategory] = React.useState<string>('متاح')
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

                {/* categor bar */}
                <View style={{ width: '100%', height: scale(50), justifyContent: 'center', alignItems: 'center', marginTop: scale(10) }}>

                    <CategoryBar
                        categories={['غير متاح', 'متاح']}
                        onCategorySelect={(cat) => setSelectedCategory(cat)}
                        initialSelected={'متاح'}
                    />
                </View>

                {selectedCategory === 'متاح' ? <View>

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
                </View> :
                    <View style={{ width: '100%', height: scale(400), display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: scale(10) }}>
                        <DeliveryNotFound />
                        <Text style={{ fontFamily: 'Almarai', fontSize: scale(16), color: '#036E65', marginTop: scale(10), lineHeight: scale(24) }}>
                            يبدو انك غير متاح حاليًا لتوصيل الطلبات
                        </Text>
                    </View>
                }



            </ScrollView>
        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    scrollView: { width: '100%', height: '100%', marginBottom: scale(-30) },

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

})