import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import Main from '@/app/(routes)/delivery/home/main'
import ToDeliver from '@/app/(routes)/delivery/home/toDeliver'
import Orders from '@/app/(routes)/delivery/home/orders'
import Profile from '@/app/(routes)/delivery/home/account'



const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white', borderTopWidth: 0, elevation: 0, shadowOpacity: 0.1, height: 100, paddingTop: 10
        },
        tabBarActiveTintColor: '#036E65',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarLabelStyle: {
          fontFamily: 'Almarai', fontWeight: 'bold',
          marginTop: 5,
        },
        tabBarHideOnKeyboard: true,

      }}
    >
      <Tab.Screen
        name="الرئيسية"
        component={Main}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon3 name="house" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="للتوصيل"
        component={ToDeliver}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="delivery-dining" color={color} size={size + 5} />
          ),
        }}
      />

      <Tab.Screen
        name="الطلبات"
        component={Orders}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="box" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="الحساب"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon4 name="shield-account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
