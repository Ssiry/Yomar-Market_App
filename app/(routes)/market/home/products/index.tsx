import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Linking } from 'react-native'
import React, { useState } from 'react'
// import MarketsMap from './MarketsMap'
import { SafeAreaView } from 'react-native-safe-area-context'
import { s, scale } from 'react-native-size-matters'
import BgPattern from '@/assets/svg/Pattern'
import Icon from 'react-native-vector-icons/Ionicons'
import { router } from 'expo-router'
import ProductCard from '@/components/elements/ProductCard'
import ProductCardRow from '@/components/elements/ProductCardRow'
import * as DocumentPicker from 'expo-document-picker';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome5';

import Add from './Add'
import AddCategory from './AddCategory'
import PopUp from '@/app/(Utitilies)/PopUp'

const Categories = [
    { item: 'التوابل', },
    { item: 'المجمدات', },
    { item: 'الألبان', },
    { item: 'المنزل', },
    { item: 'الخضروات', },
    { item: 'المعلبات', },
    { item: 'اللحوم', },
    { item: 'المخبوزات', },
    { item: 'التموينات', },
    { item: 'المشروبات', },
    { item: 'التنظيف', },
    { item: 'الأسماك', },


]

const index = () => {
    const [add, setAdd] = useState(false);
    const [addCategory, setAddCategory] = useState(false);
    const [addProduct, setAddProduct] = useState(false);
    const [file, setFile] = useState(false);


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


    return (
        <SafeAreaView
            style={styles.safeContainer}>
            <View style={{ position: 'absolute', top: 0, opacity: 0.1 }}>
                <BgPattern />
            </View>
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        width: '100%',
                        paddingVertical: scale(10),
                        gap: scale(10),
                    }}
                >
                    {Categories.map((cat, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.catItem, { display: 'flex', alignContent: 'center', justifyContent: "center" }]}
                        // onPress={() => router.push(`/home/products/${cat.item}`)}
                        >
                            <Text style={styles.catItemText}>
                                {cat.item}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>


                {/* see All Product from best sale */}
                <View style={styles.pageTitle}>
                    <View style={{
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

                    }}>

                        <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" }}>
                            كُل المنتجات
                        </Text>

                        <TouchableOpacity
                            style={styles.iconButton}

                            onPress={() => { router.push("/(routes)/market/home/products/seeAll/mostSale") }}
                        >
                            <Icon name="arrow-forward" size={scale(14)} color="#036E65" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#333', fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                        الاكثر مبيعاً
                    </Text>
                </View>

                <ProductCardRow />


                {/* see All Product from added latest */}
                <View style={styles.pageTitle}>
                    <View style={{
                        padding: scale(4),
                        height: scale(36),
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'center',
                        gap: scale(6),
                        alignItems: 'center',

                    }}>

                        <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" }}>
                            كُل المنتجات
                        </Text>

                        <TouchableOpacity
                            style={styles.iconButton}

                            onPress={() => { router.push("/(routes)/market/home/products/seeAll/lastAdded") }}
                        >
                            <Icon name="arrow-forward" size={scale(14)} color="#036E65" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: '#333', fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                        المضافة مؤخراً
                    </Text>
                </View>
                <ProductCardRow />




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
                onPress={() => setAddCategory(false)}
            />

            {/* add Product Here */}

        </SafeAreaView>
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
    catItem: { width: 105, height: 40, backgroundColor: '#C8DFDD', borderRadius: scale(8) },
    catItemText: {
        fontFamily: 'Almarai',
        fontSize: scale(14),
        fontWeight: "400",
        textAlign: 'center',
        color: '#333',
        lineHeight: scale(22),
    }
})