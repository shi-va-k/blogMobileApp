import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function Search() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View>
          <Text>search</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});