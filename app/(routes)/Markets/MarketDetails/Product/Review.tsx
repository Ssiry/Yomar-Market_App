import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { scale } from 'react-native-size-matters'
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReviewCard from './ReviewCard';

const reviews = [
    {
        id: 1,
        name: 'محمد عادل',
        rating: 4,
        text: 'المنتج جاء نفس الصورة بالضبط، وجودته ممتازة 👌 التغليف كان مرتب والتوصيل سريع. أنصح فيه وبقوة!',
        image: require('@/assets/images/avatar.png'),
    },
    {
        id: 2,
        name: 'أسماء فؤاد',
        rating: 5,
        text: 'خدمة رائعة جدًا والتعامل راقي! سأطلب مرة أخرى بالتأكيد.',
        image: require('@/assets/images/avatar.png'),
    },
    {
        id: 3,
        name: 'أحمد حسن',
        rating: 3,
        text: 'المنتج جيد لكن التغليف لم يكن بالشكل المتوقع.',
        image: require('@/assets/images/avatar.png'),
    },
    {
        id: 4,
        name: 'سارة محمد',
        rating: 5,
        text: 'رائع! جودة ممتازة وتوصيل في الوقت المحدد. شكراً لكم.',
        image: require('@/assets/images/avatar.png'),
    },
    {
        id: 5,
        name: 'كريم عبد الله',
        rating: 2,
        text: 'للأسف المنتج مختلف قليلاً عن الصورة والتوصيل تأخر.',
        image: require('@/assets/images/avatar.png'),
    },
    {
        id: 6,
        name: 'منى عبد الرحمن',
        rating: 4,
        text: 'المنتج ممتاز، ولكن أتمنى تحسين التغليف في المستقبل.',
        image: require('@/assets/images/avatar.png'),
    },
];

const Review = () => {
    return (
        <View>
            <ScrollView
                horizontal={false}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{ padding: scale(5), marginBottom: scale(10), }}
                contentContainerStyle={{ paddingBottom: scale(100) }}
            >

                <View style={styles.pageTitle}>
                    <View style={{
                        height: scale(36),
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: 'center',
                        gap: scale(6),
                        alignItems: 'center',
                    }}>

                        <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" }}>
                            كُل التقيمات
                        </Text>

                        <TouchableOpacity
                            style={styles.iconButton}
                        >
                            <Icon name="arrow-forward-ios" size={scale(14)} color="#036E65" />
                        </TouchableOpacity>
                    </View>

                    <Text style={{ color: '#036E65', fontFamily: 'Almarai', fontSize: scale(16), fontWeight: 'bold' }}>
                        تقييم عملائنا
                    </Text>
                </View>


                {reviews.map((review) => (
                    <ReviewCard
                        key={review.id}
                        name={review.name}
                        image={review.image}
                        rating={review.rating}
                        text={review.text}
                    />
                ))}

                {/* last review */}
                <View style={{ width: "100%", height: scale(40), display: "flex", justifyContent: "center", alignItems: "center", marginTop: scale(10) }}>
                    <Text style={{ fontFamily: "Almarai", lineHeight: scale(20), color: "#036E65" }}>
                        لا توجد المزيد من التقيمات
                    </Text>
                </View>

            </ScrollView>
        </View>
    )
}

export default Review

const styles = StyleSheet.create({
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
        width: "100%"
        , justifyContent: "space-between", alignItems: "center", position: "relative", display: "flex", flexDirection: "row-reverse",
        marginBottom: scale(10)
    },
})