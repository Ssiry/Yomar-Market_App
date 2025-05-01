// components/ReviewCard.js
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ReviewCardProps {
    name: string;
    image: any; // You can use ImageSourcePropType from 'react-native' for stricter typing
    rating: number;
    text: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ name, image, rating, text }) => {
    return (
        <View style={styles.card}>
            {/* الجانب الأيسر (صورة واسم وتقييم) */}
            <View style={styles.leftColumn}>
                <Image
                    source={image}
                    style={styles.avatar}
                    resizeMode="cover"
                />
                <Text style={styles.name}>{name}</Text>
                <View style={styles.ratingRow}>
                    <View style={{ flexDirection: 'row', gap: scale(1) }}>
                        {Array.from({ length: 5 }).map((_, index) => {
                            const fullStars = Math.floor(rating);
                            const hasHalfStar = rating - fullStars >= 0.5;

                            let iconName = 'star-outline';
                            if (index < fullStars) {
                                iconName = 'star';
                            } else if (index === fullStars && hasHalfStar) {
                                iconName = 'star-half';
                            }

                            return (
                                <Icon
                                    key={index}
                                    name={iconName}
                                    size={scale(10)}
                                    color="#036E65"
                                />
                            );
                        })}
                    </View>
                    {/* <Text style={styles.rating}>{rating}</Text> */}
                </View>
            </View>

            {/* النص */}
            <Text
                style={styles.reviewText}
                numberOfLines={4}
                ellipsizeMode="tail"
            >
                {text}
            </Text>
        </View>
    );
};

export default ReviewCard;

const styles = StyleSheet.create({
    card: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: scale(8),
        borderBottomColor: '#E5E5E5',
        borderBottomWidth: scale(1),
    },
    leftColumn: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: scale(8),
        borderRadius: scale(8),
        // backgroundColor: '#E5E5E5',
        width: '30%',
        gap: scale(4),
    },
    avatar: {
        width: scale(36),
        height: scale(36),
        borderRadius: scale(18),
    },
    name: {
        fontFamily: 'Almarai',
        color: '#036E65',
        fontSize: scale(10),
        fontWeight: 'bold',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8),
    },
    rating: {
        fontFamily: 'Almarai',
        color: '#036E65',
    },
    reviewText: {
        fontFamily: 'Almarai',
        fontSize: scale(12),
        lineHeight: scale(18),
        color: '#036E65',
        width: '60%',
        textAlign: 'center',
    },
});
