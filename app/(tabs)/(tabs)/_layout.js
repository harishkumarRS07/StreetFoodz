import { Tabs } from 'expo-router';
import React from 'react';
import { Entypo } from '@expo/vector-icons'; 
import { useColorScheme } from '@/hooks/useColorScheme';
import { View, Text, StyleSheet } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff6347',  
        tabBarInactiveTintColor: '#8e8e8e',  
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff', 
          borderTopWidth: 0,         
        },
      }}
    >
      <Tabs.Screen
        name="home" 
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? 'home' : 'home'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart" 
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? 'shopping-cart' : 'shopping-cart'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile" 
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name={focused ? 'user' : 'user'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}


const HomeScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#f0f8ff' }]}>
      <Text style={styles.text}>Home Screen</Text>
    </View>
  );
};


const CartScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#ffe4e1' }]}>
      <Text style={styles.text}>Cart Screen</Text>
    </View>
  );
};


const ProfileScreen = () => {
  return (
    <View style={[styles.container, { backgroundColor: '#e6e6fa' }]}>
      <Text style={styles.text}>Profile Screen</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
