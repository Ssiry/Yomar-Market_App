import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/FontAwesome6';
import Icon4 from 'react-native-vector-icons/MaterialCommunityIcons';

import Main from '@/app/(routes)/home/main'
import Cart from '@/app/(routes)/home/cart'
import Orders from '@/app/(routes)/home/orders'
import Favourite from '@/app/(routes)/home/fav';
import Profile from '@/app/(routes)/home/account'



const Tab = createBottomTabNavigator();
export default function Home() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: 'white', borderTopWidth: 0, elevation: 0, shadowOpacity: 0.1, height: 100, paddingTop: 10 },
        tabBarActiveTintColor: '#036E65',
        tabBarInactiveTintColor: '#BDBDBD',
        tabBarLabelStyle: { fontFamily: 'Almarai', fontWeight: 'bold' },

        // tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        // tabBarShowLabel: false,
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
        name="السلة"
        component={Cart}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon2 name="shopping-bag" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="المفضلة"
        component={Favourite}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="heart-sharp" color={color} size={size} />
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
