import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from "react-redux";
export default function App() {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('hlooooo');
  const [bio, setBio] = useState('Jai Balayyaa jj🔥🔥💘');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');

  const router = useRouter();

  const selectImage = () => {
    if (isEditing && Platform.OS !== 'web') {
      launchImageLibrary({}, (response) => {
        if (response.uri) {
          setProfileImage(response.uri);
        }
      });
    } else if (isEditing && Platform.OS === 'web') {

      document.getElementById('fileInput').click();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    router.replace("/sign-in");
  };


  // const user = useSelector((state) => state.user || {});
  const user = useSelector((state) => state.user || { name: 'Guest' });



  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>{user.name}</Text>
              <FontAwesome name="angle-down" size={20} />
            </View>
            <TouchableOpacity onPress={() => setIsDropdownVisible(!isDropdownVisible)}>
              <FontAwesome name="bars" size={24} color="black" />
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={handleLogout}>
                  <Text style={styles.dropdownItem}>Logout</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.profileStats}>
            <View style={styles.profileImageContainer}>
              <TouchableOpacity onPress={selectImage}>
                <Image
                  style={styles.profileImage}
                  source={{ uri: profileImage }}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.statContainer}>
              <Text style={styles.statNumber}>178</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>

            <View style={styles.statContainer}>
              <Text style={styles.statNumber}>878</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>

            <View style={styles.statContainer}>
              <Text style={styles.statNumber}>578</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioHeader}>Name</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            ) : (
              <Text>{name}</Text>
            )}
          </View>

          <View style={styles.bioContainer}>
            <Text style={styles.bioHeader}>Bio</Text>
            {isEditing ? (
              <TextInput
                style={styles.textInput}
                value={bio}
                onChangeText={setBio}
                placeholder="Write your bio"
                multiline
              />
            ) : (
              <Text>{bio}</Text>
            )}
          </View>

          <View style={styles.editProfileButton}>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Text style={styles.editProfileText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.iconRow}>
            <FontAwesome name="play-circle" size={34} color="black" />
            <FontAwesome name="play-circle" size={34} color="black" />
            <FontAwesome name="play-circle" size={34} color="black" />
            <FontAwesome name="play-circle" size={34} color="black" />
          </View>

          {Platform.OS === 'web' && (
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              accept="image/*"
              onChange={handleFileChange}
            />
          )}
        </View>
        <Text>{user.name}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  barsContainer: {
    position: 'relative',
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    width: 120,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profileStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    alignItems: 'center',
  },
  profileImageContainer: {
    alignItems: 'center',
  },
  profileImage: {
    backgroundColor: 'gray',
    height: 86,
    width: 86,
    borderRadius: 43,
  },
  statContainer: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'gray',
  },
  bioContainer: {
    marginTop: 6,
  },
  bioHeader: {
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'gray',
  },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 4,
    marginTop: 5,
    fontSize: 14,
  },
  editProfileButton: {
    width: '100%',
    backgroundColor: '#e0e0e0',
    marginTop: 16,
    padding: 8,
    borderRadius: 8,
  },
  editProfileText: {
    textAlign: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});
