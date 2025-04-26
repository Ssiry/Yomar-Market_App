import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';


const categories = [
    { id: 1, name: 'الكل' },
    { id: 2, name: 'الأقرب' },
    { id: 3, name: 'المفضلة' },
    { id: 4, name: 'الأكثر طلباً' },
    { id: 5, name: 'الأعلى تقييماً' },
    { id: 6, name: 'العروض' },
]

const CategoryBar = () => {
    const [selectedCategory, setSelectedCategory] = useState('المفضلة');
    return (
        <View style={{ width: "auto", height: "auto" }} >
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.categoryBar}
                contentContainerStyle={styles.categoryBarContent}
                bounces={true}
            // bouncesZoom={false}
            >

                {categories.map((category, index) => (
                    <TouchableOpacity
                        key={index}
                        style={selectedCategory === category.name ? styles.categoryItemSelected : styles.categoryItem}
                        onPress={() => setSelectedCategory(category.name)}
                    >

                        <Text style={selectedCategory === category.name ? styles.categoryItemTextSelected : styles.categoryItemText}>
                            {category.name}
                        </Text>
                    </TouchableOpacity>))}

            </ScrollView>
        </View>
    )
}

export default CategoryBar

const styles = StyleSheet.create({

    categoryBar: {
        width: '100%',
        height: scale(50),
        marginTop: scale(10),
        marginBottom: scale(10),
        // paddingHorizontal: scale(4),
        borderRadius: scale(100),
        backgroundColor: "#036E65",

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

    categoryBarContent: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: scale(50),
        paddingHorizontal: scale(6),

    },
    categoryItem: {
        width: scale(70),
        height: scale(34),
        marginHorizontal: scale(2),
        borderRadius: scale(100),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    categoryItemSelected: {
        backgroundColor: "#FED90E",
        width: scale(100),
        height: scale(34),
        marginHorizontal: scale(2),
        borderRadius: scale(100),

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },



    categoryItemTextSelected: {
        fontFamily: "Almarai",
        fontSize: scale(12),
        fontWeight: "700",
        color: "#036E65",
        textAlign: "center",
        textAlignVertical: "center",
    },

    categoryItemText: {
        fontFamily: "Almarai",
        fontSize: scale(12),
        fontWeight: "700",
        color: "#FED90E",
        textAlign: "center",
        textAlignVertical: "center",

    },
    // pageTitle: {
    //     paddingVertical: scale(5),
    //     borderBottomColor: "#036E65", borderTopColor: "#036E65", borderWidth: scale(1), borderRightWidth: (0), borderLeftWidth: scale(0),
    //     width: "100%", height: scale(50), justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row-reverse",
    //     marginTop: scale(14)
    // },
})