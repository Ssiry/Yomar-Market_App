import MarketCard from '@/components/elements/MarketCard';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    I18nManager,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Ionicons';



interface DataType {
    id: string;
    title: string;
    distance: string;
    rating: number;
}

const data: DataType[] = [
    { id: '1', title: 'تموينات الراعي', distance: '190m', rating: 4.5 },
    { id: '2', title: 'تموينات الراعي', distance: '190m', rating: 4.5 },
    { id: '3', title: 'تموينات الراعي', distance: '190m', rating: 4.5 },
    { id: '4', title: 'تموينات الراعي', distance: '190m', rating: 4.5 },
];

export default function SearchScreen() {

    const [query, setQuery] = useState('');
    const filtered = data.filter(item =>
        item.title.includes(query.trim())
    );

    const renderItem = ({ item }: { item: DataType }) => (
        <MarketCard />
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.searchBox}>
                <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
                    <Icon name="chevron-back-outline" size={scale(24)} color="#000" />
                </TouchableOpacity>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    placeholder="ابحث عن منتج أو متجر"

                    style={styles.input}

                    placeholderTextColor="#aaa"
                />
                <Icon name="search" size={scale(24)} color="#000" />
            </View>

            <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>المحلات</Text>
                <View style={styles.dividerLine} />
            </View>

            {query && filtered.length === 0 ? (

                // No results found
                <View style={styles.emptyContainer}>
                    <Image
                        source={require('@/assets/images/Image.png')}
                        style={{ width: 150, height: 150, marginBottom: 20 }}
                    />
                    <Text style={styles.emptyText}>
                        لا يوجد "{query}"
                    </Text>
                    <Text style={styles.emptySubText}>
                        تعذر محرك بحثنا عن الوصول لنتائج. يرجى التأكد من الإملاء الصحيح لمحتوى البحث
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filtered}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    horizontal={false}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({

    dividerContainer: {
        flexDirection: "row", width: '100%', justifyContent: "center",
        alignItems: "center", marginTop: scale(24)
    },
    dividerLine: {
        width: scale(50), height: 1, backgroundColor: "#878787", marginHorizontal: scale(8)
    },
    dividerText: {
        fontFamily: 'Almarai', fontSize: scale(14), height: scale(20), color: "#878787"
    },
    pageTitle: {
        width: '100%',
        height: scale(40),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'absolute',
        top: scale(54),
        zIndex: 1,
        paddingHorizontal: scale(20),
    },
    iconButton: {
        backgroundColor: '#E5E5E5',
        borderRadius: scale(8),
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
        // paddingTop: 50,
    },
    searchBox: {
        backgroundColor: '#f5f5f5',
        borderRadius: 15,
        padding: 10,
        marginBottom: 10,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    input: {
        fontSize: 16,
        textAlign: 'right',
        width: '80%',
        paddingHorizontal: scale(10),
        fontFamily: 'Almarai',
    },
    resultLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 10,
        textAlign: 'right',
    },
    card: {
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        padding: 10,
        width: '48%',
        marginBottom: 16,
        position: 'relative',
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    badge: {
        backgroundColor: '#ffe500',
        borderRadius: 6,
        paddingHorizontal: 6,
        fontSize: 12,
    },
    heart: {
        fontSize: 16,
        color: '#aaa',
    },
    imagePlaceholder: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    rating: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 14,
    },
    subtitle: {
        fontSize: 12,
        color: '#666',
    },
    navIcon: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    emptyContainer: {
        alignItems: 'center',
        marginTop: 40,
        paddingHorizontal: 20,
    },
    emptyText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#00796B',
        marginBottom: 8,
    },
    emptySubText: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});
