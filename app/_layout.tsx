import { View, Text } from 'react-native'
import React from 'react'
import '../global.css'
import { Slot, Stack } from 'expo-router'
import store from '../redux/store'
import { Provider } from "react-redux";

const RootLayout = () => {
  return (
  <Provider store={store}>
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name='sign-in' options={{headerShown: false}} />
    </Stack>
 </Provider>
)
}

export default RootLayout