import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

interface CategoryBarProps {
    categories: string[];
    onCategorySelect: (category: string) => void;
    initialSelected?: string;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, onCategorySelect, initialSelected }) => {
    const [selected, setSelected] = useState(initialSelected || categories[0]);

    const handleSelect = (category: string) => {
        setSelected(category);
        onCategorySelect(category);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                style={{ borderRadius: scale(100), paddingHorizontal: scale(0) }}
                horizontal showsHorizontalScrollIndicator={false}>
                {categories.map((category) => (

                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryItem,
                            selected === category && styles.categoryItemSelected,
                        ]}
                        onPress={() => handleSelect(category)}
                    >
                        <Text style={[
                            styles.categoryText,
                            selected === category && styles.categoryTextSelected,
                        ]}>
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        paddingVertical: scale(10),
        // paddingHorizontal: scale(10),
        borderRadius: scale(100),
        backgroundColor: '#036E65',
    },
    categoryItem: {
        backgroundColor: 'transparent',
        borderRadius: scale(20),
        paddingHorizontal: scale(16),
        // paddingVertical: scale(2),

        marginHorizontal: scale(10),

    },
    categoryItemSelected: {
        backgroundColor: '#FED90E',
    },
    categoryText: {
        fontSize: scale(14),
        fontWeight: '500',
        color: '#FED90E',
        fontFamily: 'Almarai',
        textAlign: 'center',
        lineHeight: scale(28),
        // margin
    },
    categoryTextSelected: {
        // fontSize: scale(12),

        color: '#036E65',
        fontWeight: 'bold',
    },
});

export default CategoryBar;
