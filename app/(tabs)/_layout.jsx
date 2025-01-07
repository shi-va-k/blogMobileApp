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
            // Use a transparent background on iOS to show the blur effect
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
// import React, { useState } from 'react';
// import { Platform, Dimensions, StyleSheet } from 'react-native';
// import { TabView, SceneMap } from 'react-native-tab-view';
// import { HapticTab } from '@/components/HapticTab';
// import { IconSymbol } from '@/components/ui/IconSymbol';
// import TabBarBackground from '@/components/ui/TabBarBackground';
// import { Colors } from '@/constants/Colors';
// import { useColorScheme } from '@/hooks/useColorScheme';

// // Your screen components
// import Home from './home';  // Make sure to import your screen components
// import Search from './search';
// import Add from './add';
// import Profile from './profile';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const layout = Dimensions.get('window'); // Get window dimensions for TabView layout

//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: 'home', title: 'Home' },
//     { key: 'search', title: 'Search' },
//     { key: 'add', title: 'Add' },
//     { key: 'profile', title: 'Profile' },
//   ]);

//   // SceneMap for rendering the screens based on tab selection
//   const renderScene = SceneMap({
//     home: Home,
//     search: Search,
//     add: Add,
//     profile: Profile,
//   });

//   return (
//     <TabView
//       navigationState={{ index, routes }}
//       renderScene={renderScene}
//       onIndexChange={setIndex} // Update index when swiping between tabs
//       initialLayout={{ width: layout.width }} // Ensure the layout works on all screen sizes
//       style={styles.container}
//       swipeEnabled={true} // Enable swipe gesture between tabs
//       tabBarStyle={{
//         backgroundColor: Colors[colorScheme ?? 'light'].background,
//       }}
//       tabBarPosition="bottom" // You can adjust the tab position
//       sceneContainerStyle={{
//         backgroundColor: 'white',
//       }}
//       renderTabBar={(props) => (
//         <Tabs {...props} tabBarButton={HapticTab} tabBarBackground={TabBarBackground} />
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
