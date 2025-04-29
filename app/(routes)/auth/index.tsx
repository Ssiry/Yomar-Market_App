import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";

const Auth = () => {
    useEffect(() => {
        const checkUserStatus = async () => {
            // Check if the user is using the app for the first time
            const isFirstTime = await checkFirstTimeUse(); // Replace with your logic
            // const isFirstTime = true;
            if (true) {
                // router.push("/(routes)/auth/register");
                // router.push('/(routes)/home')
                router.push('/(routes)/Markets/MarketDetails');
                return;
            }

            // Check 60-day validation
            const isValid = await check60DayValidation(); // Replace with your logic
            // const isValid = true;
            if (isValid) {
                // router.push('/(routes)/home');

                router.push('/(routes)/auth/login');
                return;
            }

            // Navigate to Home
            router.push('/(routes)/home');
            return;


        };

        checkUserStatus();
    }, []);

    // Replace checkFirstTimeUse and check60DayValidation with actual implementations
    const checkFirstTimeUse = async () => {
        const isUser = await AsyncStorage.getItem('UserCounter');

        // Logic to determine if the user is using the app for the first time
        if (isUser === "") {
            // the user is the first time enter application 
            // set usercounter to value
            AsyncStorage.setItem('UserCounter', "1");
            // then app should go to Register screen 
            // ask for Location and Internet

            // if all done go to register
            // if not done alert till access
            return true;
        }

        return false; // Example: Replace with actual logic
    };

    const check60DayValidation = async () => {
        const UserCounter = await AsyncStorage.getItem('UserCounter');
        // Logic to validate the 60-day condition
        if (UserCounter !== "") {
            // the user already goined before => go to Login screen | Home page
            // check Location and Internet
            // check the tokin lifetime (dead , alive)

            // if all done & tokin "alive"  go to  HOME page directly 
            // if all done & tokin "dead"  go to LOGIN page
            // if not done alert till access denied
            return true;
        }
        return false; // Example: Replace with actual logic
    };




    return (
        <View style={styles.container}>

            <ActivityIndicator size="large" color="#036E65" />

        </View>
    )
}

export default Auth

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        alignItems: "center"
    },

})
