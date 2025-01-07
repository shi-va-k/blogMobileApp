import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SocketContextProvider } from '../../SocketContext';

const AuthLayout = () => {
  return (
    // <Stack options={{headerShown: false}}>
    //   {/* Sign-In Screen */}
    //   <Stack.Screen 
    //     name="sign-in" 
    //     // options={{ headerShown: false }} 
    //   />
    //   {/* Sign-Up Screen */}
    //   <Stack.Screen 
    //     name="sign-up" 
    //     // options={{ headerShown: false }} 
    //   />
    // </Stack>
    // <SocketContextProvider>
    <Stack screenOptions={{ headerShown: false }}>
    {/* Add all your screens here */}
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="sign-up" />
    {/* Other screens can go here */}
  </Stack>
  // </SocketContextProvider>
  );
}

export default AuthLayout;
