import React, { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MarketIndex: React.FC = () => {
    const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkOnboarding = async () => {
            try {
                const onboarding = await AsyncStorage.getItem('onboarding');
                const user = await AsyncStorage.getItem('UserCounter');
                // If onboarding is not done or user is not present, show onboarding
                setIsOnboarding(!onboarding || !user);
                console.log('Onboarding already done before:', onboarding);
            } catch (error) {
                console.error('Error checking onboarding:', error);
                setIsOnboarding(true);
            } finally {
                setLoading(false);
            }
        };
        checkOnboarding();
    }, []);

    // if (loading) {
    //     return null;
    // }

    return (
        // <View>
        // <Redirect href={isOnboarding ? '/(routes)/market/onboarding' : '/(routes)/market/auth'} />
        <Redirect href={isOnboarding ? '/(routes)/market/home/account' : '/(routes)/market/auth'} />
        // </View>
    );
};

export default MarketIndex;