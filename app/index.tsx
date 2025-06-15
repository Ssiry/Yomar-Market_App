import React, { useEffect, useState } from 'react'
import { Redirect } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
    const [Onbaording, setIsOnboarding] = useState(true);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const checkOnboarding = async () => {
            const isOnboarding = await AsyncStorage.getItem('onboarding');
            const isUser = await AsyncStorage.getItem('UserCounter');

            if (isUser) {
                setIsOnboarding(false);
            } else {

            }
            console.log("Onboarding already completed", isOnboarding);

            setLoading(false);
        };
        checkOnboarding();

    }, []);
    if (loading) {
        return null;
    }
    return <Redirect href={Onbaording ? "/(routes)/onboarding" : "/(routes)/auth/register"} />
    // return <Redirect href={Onbaording ? "/(routes)/plans" : "/(routes)/auth"} />

}