import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
      tabBarStyle={{
        
      }}>
      <Tabs.Screen
        name="home"
        options={{
            headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="house.fill" color={color}
          
          />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
            headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="search.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
            headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="add.fill" color={color} />,
        }}
      />
 
      <Tabs.Screen
        name="profile"
        options={{
            headerShown: false,
          title: '',
          tabBarIcon: ({ color }) => <IconSymbol size={30} name="profile.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
