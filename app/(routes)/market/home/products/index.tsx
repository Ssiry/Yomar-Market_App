import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking, ActivityIndicator, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
// import MarketsMap from './MarketsMap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import * as DocumentPicker from 'expo-document-picker';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome5';

import Add from './Add'
import AddCategory from './AddCategory'
import PopUp from '@/app/(Utitilies)/PopUp'
import axios from 'axios'
import { GestureHandlerRootView, RefreshControl } from 'react-native-gesture-handler'
import LatestProductCard from './seeAll/latestRow'
import BestProductCard from './seeAll/bestSalesRow'
import CategoryProducts from './seeAll/byCategory'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { push } from 'expo-router/build/global-state/routing'


const index = () => {
    const [add, setAdd] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [file, setFile] = useState(false);

    const [categories, setCategories] = useState<{
        id: string; name: string;
    }[]>([]);

    const [loading, setLoading] = useState(true); // لعرض مؤشر التحميل
    const [error, setError] = useState<string | null>(null);


    const pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: [
                'application/vnd.ms-excel',               // .xls
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
                'text/csv',                                // .csv
            ],
            copyToCacheDirectory: true,
        });

        if (!result.canceled) {
            console.log('Picked file:', result.assets?.[0]);
            alert(`Picked: ${result.assets?.[0]?.name}`);
        } else {
            console.log('File picking cancelled.');
        }
        setFile(false);
    };

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://192.168.1.11:5007/market/products/categories'); // عدّل الرابط حسب عنوان السيرفر
            setCategories(response.data);
        } catch (err) {
            console.error('❌ Error fetching categories:', err);
            setError('حدث خطأ أثناء جلب التصنيفات');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [])

    if (loading) return <ActivityIndicator size="large" color="#000" />;
    if (error) return <Text>{error}</Text>;

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <SafeAreaView style={styles.safeContainer}>
                <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                    <BgPattern />
                </View>

                <ScrollView
                    style={styles.scrollView}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={fetchCategories}
                            colors={['#036E65']}
                        />
                    }
                >

                    <View style={styles.pageTitle}>

                        <TouchableOpacity style={styles.iconButton}
                            onPress={() => setAdd(true)}
                        >
                            <Icon name="add-circle-outline" size={scale(24)} color="#036E65" />
                        </TouchableOpacity>

                        <Text style={styles.pageTitleText}>
                            ادارة المنتجات
                        </Text>

                        {/* <View style={styles.dummyView} /> */}
                        <TouchableOpacity
                            onPress={() => pickDocument()}
                            style={styles.iconButton}>
                            <FontAwesome6Icon name="file-upload" size={scale(24)} color={'#036E65'} />
                        </TouchableOpacity>
                    </View>

                    {/* MARK:- Flex Category */}
                    <View
                        style={styles.view2}
                    >
                        {loading ? (
                            <ActivityIndicator size="large" color="#036E65" />
                        ) : (
                            categories.map((item, id) => (
                                <TouchableOpacity
                                    key={id}
                                    style={[styles.catItem]}
                                    onPress={() => {
                                        AsyncStorage.setItem('SelectedCategoryId', item.id.toString());
                                        AsyncStorage.setItem('SelectedCategoryName', item.name);

                                        // <CategoryProducts categoryId={id} />
                                        router.push('/(routes)/market/home/products/seeAll/byCategory')
                                    }
                                    }
                                >
                                    <Text style={styles.catItemText}>
                                        {item.name}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>


                    {/* see All Product from best sale */}
                    <View style={styles.pageTitle}>
                        <View style={styles.view3}>

                            <Text style={styles.text1}>
                                كُل المنتجات
                            </Text>

                            <TouchableOpacity
                                style={styles.iconButton}

                                onPress={() => { router.push("/(routes)/market/home/products/seeAll/mostSale") }}
                            >
                                <Icon name="arrow-forward" size={scale(14)} color="#036E65" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text2}>
                            الاكثر مبيعاً
                        </Text>
                    </View>
                    <BestProductCard />
                    {/* <ProductCardRow /> */}


                    {/* see All Product from added latest */}
                    <View style={styles.pageTitle}>
                        <View style={styles.view4}>

                            <Text style={styles.text1}>
                                كُل المنتجات
                            </Text>

                            <TouchableOpacity
                                style={styles.iconButton}

                                onPress={() => { router.push("/(routes)/market/home/products/seeAll/lastAdded") }}
                            >
                                <Icon name="arrow-forward" size={scale(14)} color="#036E65" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text2}>
                            المضافة مؤخراً
                        </Text>
                    </View>

                    <LatestProductCard />

                    {/* <ProductCardRow /> */}

                </ScrollView>



                <Add
                    visible={add}
                    onCategoryConfirm={() => {
                        setAdd(false);
                        setAddCategory(true);
                    }}
                    onProductConfirm={() => {
                        setAdd(false);
                        // setAddProduct(true);
                        router.push('/(routes)/market/home/products/addProduct');
                    }}
                    onCancel={() => setAdd(false)}
                />

                <AddCategory
                    isVisible={addCategory}
                    // add new category
                    onPress={() => {
                        fetchCategories();
                        setAddCategory(false);
                    }}
                />

                {/* add Product Here */}

            </SafeAreaView>
        </GestureHandlerRootView>
    )
}

export default index

const styles = StyleSheet.create({
    safeContainer: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal: scale(18), backgroundColor: '#fff', },

    scrollView: { width: '100%', height: '100%', marginBottom: scale(-30) },

    iconButton: { backgroundColor: '#E5E5E5', borderRadius: scale(8), padding: scale(4), width: scale(36), height: scale(36), justifyContent: 'center', alignItems: 'center', },
    pageTitle: {
        width: "100%",
        height: scale(40),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row-reverse",
        marginTop: scale(10),
    },
    pageTitleText: {
        fontFamily: 'Almarai',
        fontSize: scale(16),
        fontWeight: 'bold'
    },
    dummyView: {
        width: scale(36),
        height: scale(36),
        backgroundColor: 'transparent',
        borderRadius: scale(8)
    },
    catItem: { display: 'flex', alignContent: 'center', justifyContent: "center", width: 105, height: 40, backgroundColor: '#C8DFDD', borderRadius: scale(8) },
    catItemText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: "400",
        textAlign: 'center',
        color: '#333',
        lineHeight: scale(22),
    },
    view2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        paddingVertical: scale(10),
        gap: scale(10),
    },
    view3: {
        // backgroundColor: '#E5E5E5',
        // borderRadius: scale(8),
        padding: scale(4),
        // width: scale(36),
        height: scale(36),
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        gap: scale(6),
        alignItems: 'center',

    },
    text1: { fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" },
    text2: { color: '#333', fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' },
    view4: {
        padding: scale(4),
        height: scale(36),
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        gap: scale(6),
        alignItems: 'center',

    },

})