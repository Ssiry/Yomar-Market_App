//  From Resource 

import {
  Dimensions,

  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { OnBoardingData } from "@/constants/OnBoardingData";
import { scale, verticalScale } from "react-native-size-matters";
import { useFonts } from "expo-font";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";

export default function OnBoardingScreen() {


  let [fontsLoaded, fontError] = useFonts({
    SegoeUI: require("../assets/fonts/SegoeUI.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  // MARK: - Handle Scroll
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(
      contentOffsetX / event.nativeEvent.layoutMeasurement.width
    );
    setActiveIndex(currentIndex);
  };

  //MARK: - Handle Next
  const handelNext = async () => {
    const nextIndex = activeIndex + 1;
    if (nextIndex < OnBoardingData.length) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      await AsyncStorage.setItem('onboarding', 'true');
      router.push("/(routes)/auth");
    }
  }

  //MARK: - Handle Prev
  const handelPrev = async () => {
    const nextIndex = activeIndex - 1;
    if (nextIndex >= 0) {
      scrollViewRef.current?.scrollTo({
        x: Dimensions.get("window").width * nextIndex,
        animated: true,
      });
      setActiveIndex(nextIndex);
    } else {
      await AsyncStorage.setItem('onboarding', 'true');
      //  router.push("/(routes)/home");
    }
  }





  return (
    // MARK: - Main Container start
    <LinearGradient
      colors={["#f5f7fa", "#f5f7fa"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* make the status bar in the <View/> below */}
      <Text style={styles.header}>هلا فيك في “يومار”</Text>

      {/* 
      MARK:- OnBoarding Slides  
      */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={scrollViewRef}
        style={styles.ScrollContainer}
      >
        {OnBoardingData.map((item, index) => (
          <View key={index} style={styles.slide}>
            {item.image}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* 
      MARK:- next and prev button  
      */}

      <Pressable style={styles.nextContainer} onPress={handelNext} >
        <Text style={styles.skipText}>
          التالى
        </Text>
        <AntDesign name="arrowright" size={scale(18)} color="#036E65" />
      </Pressable>

      <Pressable style={styles.prevContainer} onPress={handelPrev} >
        <AntDesign name="arrowleft" size={scale(18)} color="#036E65" />
        <Text style={styles.skipText}>
          السابق
        </Text>
      </Pressable>

      {/* 
      MARK:- Pagenation  
      */}
      <View style={styles.paginationContainer}>
        {OnBoardingData.map((_, index) => (
          <View key={index} style={[styles.dot, { opacity: activeIndex === index ? 1 : 0.3, },]} />
        ))}
      </View>
    </LinearGradient>      // MARK: - Main Container end

  );
}

const styles = StyleSheet.create({

  header: {
    fontFamily: 'Almarai',
    fontSize: scale(20),
    position: "absolute",
    width: "100%",
    textAlign: "center",
    top: scale(80),
    fontWeight: 'bold',



  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Almarai",
  },
  slide: {
    width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    translateY: scale(0)
  },
  title: {
    color: "#000",
    fontSize: scale(24),
    fontFamily: "Almarai",
    textAlign: "center",
    fontWeight: "500",
    height: scale(40)
  },
  subtitle: {
    width: scale(290),
    marginHorizontal: "auto",
    color: "#9A9999",
    fontSize: scale(16),
    fontFamily: "Almarai",
    textAlign: "center",
    fontWeight: "400",
    height: scale(40),
    paddingTop: verticalScale(10),
    height: scale(80),
    marginBottom: verticalScale(20),
    width: '75%',
    lineHeight: scale(24)
  },
  paginationContainer: {
    position: "absolute",
    bottom: verticalScale(70),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: scale(8),
  },
  dot: {
    width: scale(8),
    height: scale(8),
    borderRadius: 100,
    backgroundColor: "#036E65",
    marginHorizontal: scale(2),
  },

  nextContainer: {
    position: "absolute",
    bottom: verticalScale(70),
    right: scale(30),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    zIndex: 100,
  },
  prevContainer: {
    opacity: 0.5,
    position: "absolute",
    bottom: verticalScale(70),
    left: scale(30),
    flexDirection: "row",
    alignItems: "center",
    gap: scale(5),
    zIndex: 100,
  },

  skipText: {
    color: "#036E65",
    fontSize: scale(16),
    fontFamily: "Almarai",
    fontWeight: "400",
  },

});
