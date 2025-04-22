import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Animated, Dimensions } from 'react-native';
import React, { useRef, useEffect } from 'react';
import { scale } from 'react-native-size-matters';

Dimensions.get('window');

const banners = [
    {
        id: 1,
        title: 'استمتع بخدمة التوصيل الآن!',
        subtitle: 'سجل وابدأ طلباتك',
        image: require('@/assets/images/Image.png'),
    },
    {
        id: 2,
        title: 'عروض حصرية لفترة محدودة!',
        subtitle: 'لا تفوّت الفرصة',
        image: require('@/assets/images/banners.png'),
    },
    {
        id: 3,
        title: 'أفضل تجربة توصيل في يومار',
        subtitle: 'جرب بنفسك الآن',
        image: require('@/assets/images/banners.png'),
    },
    {
        id: 4,
        title: 'عروض حصرية لفترة محدودة!',
        subtitle: 'لا تفوّت الفرصة',
        image: require('@/assets/images/banners.png'),
    },
    {
        id: 5,
        title: 'أفضل تجربة توصيل في يومار',
        subtitle: 'جرب بنفسك الآن',
        image: require('@/assets/images/banners.png'),
    },
];

const BannerSlider = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const scrollViewRef = useRef<React.ComponentRef<typeof Animated.ScrollView>>(null);

    useEffect(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % banners.length;

            Animated.timing(scrollX, {
                toValue: currentIndex * (scale(300) + scale(16)),
                duration: 800,
                useNativeDriver: true,
            }).start();

            // Ensure scrollViewRef.current is not undefined before accessing
            if (scrollViewRef.current) {
                (scrollViewRef.current as any).scrollTo({
                    x: currentIndex * (scale(300) + scale(16)),
                    animated: true,
                });
            }
        }, 3000); // 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Animated.ScrollView
                ref={scrollViewRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={scale(300) + scale(16)}
                decelerationRate="fast"
                bounces={true}
                overScrollMode="always"
                scrollEnabled={false} // Disable manual scroll — auto only
            >
                {banners.map((banner, index) => {
                    const inputRange = [
                        (index - 1) * (scale(300) + scale(16)),
                        index * (scale(300) + scale(16)),
                        (index + 1) * (scale(300) + scale(16)),
                    ];

                    const scaleAnim = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.95, 1, 0.95],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            key={banner.id}
                            style={[
                                styles.bannerContainer,
                                { transform: [{ scale: scaleAnim }] }
                            ]}
                        >
                            <ImageBackground
                                source={banner.image}
                                style={styles.banner}
                                imageStyle={{ borderRadius: scale(12) }}
                            >
                                <View style={styles.overlay}>
                                    <Text style={styles.title}>{banner.title}</Text>
                                    <Text style={styles.subtitle}>{banner.subtitle}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                                        <Text style={styles.buttonText}>سجل الآن</Text>
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </Animated.View>
                    );
                })}
            </Animated.ScrollView>

            {/* Custom Progress Bar */}
            <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground} />
                <Animated.View
                    style={[
                        styles.progressBarFill,
                        {
                            width: scrollX.interpolate({
                                inputRange: [0, (banners.length - 1) * (scale(300) + scale(16))],
                                outputRange: ['0%', '100%'],
                                extrapolate: 'clamp',
                            }),
                        },
                    ]}
                />
            </View>
        </View>
    );
};

export default BannerSlider;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: scale(170),
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
    },
    bannerContainer: {
        width: scale(300),
        height: scale(135),
        marginRight: scale(16),
    },
    banner: {
        flex: 1,
        overflow: 'hidden',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.35)',
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: scale(16),
        borderRadius: scale(12),
    },
    title: {
        color: '#fff',
        fontSize: scale(18),
        fontWeight: 'bold',
        marginBottom: scale(6),
        fontFamily: 'Almarai',
        textAlign: 'right',
    },
    subtitle: {
        color: '#fff',
        fontSize: scale(12),
        marginBottom: scale(12),
        fontFamily: 'Almarai',
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#036E65',
        paddingVertical: scale(6),
        paddingHorizontal: scale(12),
        borderRadius: scale(100),
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Almarai',
        fontSize: scale(12),
        fontWeight: 'bold',
    },

    progressBarContainer: {
        height: scale(6),
        width: '50%',
        backgroundColor: 'transparent',
        // marginTop: scale(10),
        overflow: 'hidden',
        borderRadius: scale(3),
        transform: [{ translateY: scale(-20) }],
    },
    progressBarBackground: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#E0E0E0',

    },
    progressBarFill: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: '#036E65',
        width: '0%',
        borderRadius: scale(3),

    },
});
