import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import PopUP from "@/components/elements/popUpMsg";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import { scale } from 'react-native-size-matters';

const CheckLoc = () => {
    const [locAcc, setLocAcc] = useState(true);

    //MARK: - Handle location permission
    async function requestLocationPermission() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.log('Location permission not granted');
            setLocAcc(false);

        } else {
            console.log('Location permission granted');
            setLocAcc(true);
        }
    }

    useEffect(() => {
        const checkLocationPermission = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocAcc(true);
            } else {
                setLocAcc(false);
            }
        };
        checkLocationPermission();
    }, []);


    return (

        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>


            <PopUP
                icon={<FontAwesome6Icon name='location-crosshairs' color={'#000'} size={scale(24)} />}
                title='Product added to cart'
                subtitle='You can check it in the cart'
                btnText='Go to cart'
                isVisible={!locAcc}
                onPress={() => {
                    console.log('go to cart')
                    // setLocAcc(false)
                    requestLocationPermission()
                }}

            />
        </View>

    )
}

export default CheckLoc

const styles = StyleSheet.create({})