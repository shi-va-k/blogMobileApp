import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

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
    <Stack screenOptions={{ headerShown: false }}>
    {/* Add all your screens here */}
    <Stack.Screen name="sign-in" />
    <Stack.Screen name="sign-up" />
    {/* Other screens can go here */}
  </Stack>
  );
}

export default AuthLayout;
