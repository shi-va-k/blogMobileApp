import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import Posts from './Posts';

const storiesData = [
  { id: 1, imageUrl: 'https://via.placeholder.com/50', isActive: false },
  { id: 2, imageUrl: 'https://via.placeholder.com/50', isActive: true },
  { id: 3, imageUrl: 'https://via.placeholder.com/50', isActive: false },
  { id: 4, imageUrl: 'https://via.placeholder.com/50', isActive: true },
  { id: 5, imageUrl: 'https://via.placeholder.com/50', isActive: false },
  { id: 5, imageUrl: 'https://via.placeholder.com/50', isActive: false },
  { id: 5, imageUrl: 'https://via.placeholder.com/50', isActive: false },
  { id: 5, imageUrl: 'https://via.placeholder.com/50', isActive: false },
];

export default function Header() {
  return (
    <>
    <SafeAreaView>
      <ScrollView vertical showsHorizontalScrollIndicator={false}>
    <View style={{ display: 'flex', flexDirection: 'column', gap: 3,  }}>
  
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 10
        }}
      >
       
        <View style={{ padding: 10, borderRadius: 5 }}>
          <Text>Blog</Text>
        </View>

        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 15, 
          }}
        >
          <Icon name="heart-outline" size={24} />
          <Icon name="notifications-outline" size={24} />
        </View>
      </View>

  
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
          {storiesData.map((story) => (
            <View
              key={story.id}
              style={[
                styles.storyContainer,
                { borderColor: story.isActive ? '#ccc' : '#f7a76c' }, 
              ]}
            >
              <Image source={{ uri: story.imageUrl }} style={styles.storyImage} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
    <Posts />
    </ScrollView>
    </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  storiesContainer: {
    marginTop: 10,
    paddingHorizontal: 5,
    marginBottom: 4,
  },
  storyContainer: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderRadius: 40, // Fully rounded
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 35, // Fully rounded
  },
});
