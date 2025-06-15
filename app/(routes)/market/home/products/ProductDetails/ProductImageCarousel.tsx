import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';

const { width: screenWidth } = Dimensions.get('window');

const App = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const progress = useSharedValue(0);

    const data = [
        { id: 1, img: require('@/assets/images/product.png') },
        { id: 2, img: require('@/assets/images/product1.jpg') },
        { id: 3, img: require('@/assets/images/product2.jpeg') },
        { id: 4, img: require('@/assets/images/product3.jpeg') },
        // { id: 5, img: require('@/assets/images/product.png') },
    ];

    useEffect(() => {
        progress.value = withTiming(currentIndex, { duration: 300 });
    }, [currentIndex]);

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={screenWidth * 0.85}
                autoPlay={true}
                autoPlayInterval={3000}
                data={data}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => setCurrentIndex(index)}
                style={styles.carousel}
                renderItem={({ index }) => (
                    <View style={styles.slide}>
                        <Image
                            source={data[index].img}
                            style={{ width: "100%", height: "100%", borderRadius: 20 }}
                            resizeMode="cover"
                        />
                    </View>
                )}
            />

            {/* Animated Progress Bar */}
            <View style={styles.indicatorContainer}>
                <View style={styles.indicatorBar}>
                    {data.map((_, index) => {
                        const animatedStyle = useAnimatedStyle(() => {
                            const isActive = progress.value === index;
                            return {
                                width: withTiming(isActive ? 25 : 8),
                                height: withTiming(isActive ? 8 : 8),
                                opacity: withTiming(isActive ? 1 : 0.5),
                            };
                        });

                        return (
                            <Animated.View
                                key={index}
                                style={[styles.indicatorDot, animatedStyle]}
                            />
                        );
                    })}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    carousel: {
        aspectRatio: 1.3,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    indicatorContainer: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicatorBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#036E65',
        borderRadius: 20,
        paddingVertical: scale(4),
        paddingHorizontal: scale(10),
    },
    indicatorDot: {
        backgroundColor: '#FED90E',
        borderRadius: 5,
        marginHorizontal: 3,
    },
});

export default App;
