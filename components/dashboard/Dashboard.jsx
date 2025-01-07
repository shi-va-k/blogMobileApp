import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';

const Dashboard = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
    // const checkToken = async () => {
    //   const token = await AsyncStorage.getItem('userToken'); // Retrieve token
    //   if (!token) {
    //     router.replace('/'); // Redirect to login if no token
    //   } else {
    //     setIsLoading(false);
    //   }
    // };

    // checkToken();
//   }, [router]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken'); 
    router.replace('/'); 
  };

  if (isLoading) {
    return (
      <>
      <Stack.Screen options={{headerShown:false}}/>
      <View >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{headerShown:false}}/>
  <View>
    <Header />
  </View>
  </>
  );
};

export default Dashboard;