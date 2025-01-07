// import { View, Text } from 'react-native'
// import React from 'react'
// import '../global.css'
// import { Slot, Stack } from 'expo-router'
// import store from '../redux/store'
// import { Provider } from "react-redux";
// import { SocketContextProvider } from '../SocketContext';

// const RootLayout = () => {
//   return (
//   <Provider store={store}>
//     <Stack screenOptions={{headerShown: false}}>
//       <Stack.Screen name='sign-in' options={{headerShown: false}} />
//     </Stack>
//  </Provider>
// )
// }

// export default RootLayout


// RootLayout.js or main layout file
import React from 'react';
import { Provider } from 'react-redux';
import { SocketContextProvider } from '../SocketContext'; // Correct path to your SocketContext
import store from '../redux/store'; // Correct path to your Redux store
import { Stack } from 'expo-router';
import ChatRoom from '../components/chtaScreen/ChatRoom'
import '../global.css'


const RootLayout = () => {
  return (
    <SocketContextProvider>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" />
          <Stack.Screen name="ChatRoom"  />
        </Stack>
      </Provider>
    </SocketContextProvider>
  );
};

export default RootLayout;
