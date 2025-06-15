import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { scale } from 'react-native-size-matters'
import { ImageBackground } from 'react-native'
import SearchIcon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { router } from 'expo-router';


const Cards = [
    {
        id: 1,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 1

    },
    {
        id: 2,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 3
    },
    {
        id: 3,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 3
    },
    {
        id: 4,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 5

    },
    {
        id: 5,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 3

    },
    {
        id: 6,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 3.5

    },
    {
        id: 7,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 2

    },
    {
        id: 8,
        title: 'تموينات الراعي',
        subtitle: 'لمنتجات الالبان و الاغذية المحلية',
        image: require('@/assets/images/Background.png'),
        rate: 4

    },
];

const MarketCard = () => {
    return (
        <View style={styles.container}>
            <ScrollView


                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                horizontal={false}
                bounces
            >
                <View style={styles.cards}>


                    {Cards.map((card) => (
                        <View key={card.id} style={styles.card}>
                            <ImageBackground
                                source={card.image}
                                style={{
                                    height: scale(130),
                                    width: '100%'
                                }}
                                imageStyle={{ width: "auto", height: "auto", borderRadius: scale(7), resizeMode: 'cover' }}
                            >
                                {/* here ovelay content */}
                                <View style={{ backgroundColor: 'white', position: 'absolute', top: scale(6), left: scale(6), width: scale(50), padding: scale(2), borderRadius: scale(3), alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'row', gap: scale(4) }}>
                                    <Icon name='location' size={scale(14)} color={"#036E65"} />
                                    <Text style={{ fontSize: scale(11), fontFamily: "Almarai", fontWeight: '400', color: '#036E65' }}>
                                        190m
                                    </Text>
                                </View>

                                <View style={{ backgroundColor: 'white', position: 'absolute', top: scale(6), right: scale(6), width: scale(24), height: scale(24), display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', borderRadius: scale(3) }}>
                                    <TouchableOpacity>

                                        <Icon name='heart' size={scale(22)} color={"#036E65"} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ position: 'absolute', bottom: scale(6), left: scale(6), width: scale(55), height: scale(35), display: 'flex', flexDirection: 'column' }}>
                                    <Text style={{ fontFamily: "Almarai", color: 'white', fontWeight: '700', fontSize: scale(18), marginLeft: scale(3) }}>{card.rate}</Text>
                                    <View style={{ flexDirection: 'row', gap: scale(1) }}>
                                        {Array.from({ length: 5 }).map((_, index) => {
                                            const fullStars = Math.floor(card.rate);
                                            const hasHalfStar = card.rate - fullStars >= 0.5;

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
                                                    size={scale(14)}
                                                    color="#fff"
                                                />
                                            );
                                        })}
                                    </View>


                                </View>


                            </ImageBackground>

                            <View style={styles.bottomCard}>
                                {/* left */}
                                <View style={{ width: "80%" }} >
                                    <Text style={styles.MarketName}>
                                        {card.title}
                                    </Text>
                                    <Text style={styles.MarketDescription}>
                                        {card.subtitle}
                                    </Text>
                                </View>

                                {/* right */}
                                <TouchableOpacity
                                    onPress={() => { router.push('/(routes)/home/orders') }}
                                    style={{}}>
                                    <SearchIcon name="enter" size={scale(32)} color={'#036E65'} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>


            </ScrollView>


        </View>
    )
}

export default MarketCard

const styles = StyleSheet.create({
    container: {
        marginTop: scale(5), backgroundColor: "transparent", borderRadius: scale(8), width: "100%",
    },
    cards: {
        display: 'flex', flexDirection: "row",
        flexWrap: "wrap", justifyContent: "space-between", alignItems: "center",

    },
    card: {
        backgroundColor: "white", width: scale(150), maxWidth: scale(200), height: scale(205), borderRadius: scale(13), padding: scale(8), boxShadow: 'black', borderColor: '#E5E5E5', borderWidth: scale(1), display: 'flex', gap: scale(8)
        , marginBottom: scale(10)
    },
    bottomCard: {
        padding: scale(2), backgroundColor: "white", width: "100%", height: scale(50),
        display: 'flex', flexDirection: "row", justifyContent: "space-between", alignItems: 'center'
    },

    MarketName: {
        lineHeight: scale(20), fontSize: scale(14), fontWeight: "700", fontFamily: "Almarai",
    },
    MarketDescription: {
        lineHeight: scale(20), fontSize: scale(11), fontFamily: "Almarai",
    },
    lastCard: {
        width: scale(80), height: "100%",
        display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
        borderRadius: scale(8), borderWidth: scale(1), borderColor: '#E5E5E5'
    }
})