import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NetInfo from '@react-native-community/netinfo';
import PopUP from "@/components/elements/popUpMsg";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { scale } from 'react-native-size-matters';

const CheckNet = () => {
    const [isConnected, setIsConnected] = useState(true);

    // MARK: - Check Network Connection
    useEffect(() => {
        // Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = !!state.isConnected && (state.isInternetReachable ?? true);
            setIsConnected(connected);
        });

        // Cleanup on component unmount
        return () => unsubscribe();
    }, []);



    return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
            <PopUP
                icon={<FontAwesome6Icon name='wifi' color={'#000'} size={scale(24)} />}
                title='No internet connection'
                subtitle='Please check your internet connection'
                btnText='Try again'
                isVisible={!isConnected}
                onPress={() => {
                    console.log('try again')
                    setIsConnected(false);
                }}
            />


        </View>

    )
}

export default CheckNet

const styles = StyleSheet.create({})