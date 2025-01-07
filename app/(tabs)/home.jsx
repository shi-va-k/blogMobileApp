import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import  Header  from '../../components/dashboard/Header';
export default function Home() {
  return (
    <SafeAreaView>
      <Header />
      {/* <_layout /> */}
    </SafeAreaView>
  );
}
