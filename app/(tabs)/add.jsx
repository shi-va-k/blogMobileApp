// Add.js
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
// import { useDispatch } from 'react-redux';
import { addPost } from '../../redux/postSclice'; 
import { router } from 'expo-router';
import {BASE_URL} from '@env'


export default function Add() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [userId,setUserId]=useState(null)
  const dispatch = useDispatch();
  const tokenn = useSelector(state => state.user.token);
   console.log(token,"ldjsfkklds")
   console.log(userId,"ldjsfkkldddddds")
  // Function to open the gallery using Expo's ImagePicker
  const openGallery = async () => {
    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'You need to grant media library access to select an image.');
      return;
    }
  
    // Open the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaType: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });
  
    if (result.canceled) {
      console.log('Image selection was cancelled');
    } else if (result.assets && result.assets.length > 0) {
      console.log('Selected Image URI:', result.assets[0].uri); // Debugging the URI
      setSelectedImage(result.assets[0].uri); // Set the selected image URI
    } else {
      console.log('No URI returned from ImagePicker');
    }
  };
  

  // Function to handle text input changes
  const handleTextChange = inputText => {
    setText(inputText);
  };

  // const token = useSelector(state => state.user.token);

  // Function to handle post submission

    

  // const userId = useSelector(state => state.user.id);
  // const email = useSelector(state => state.user.email);
  // console.log(email,"shivabbaiia")
  const handlePost = async () => {
    console.log('Add button clicked');

    if (!text || !selectedImage) {
      Alert.alert('Validation Error', 'Please enter text and select an image.');
      return;
    }

    setLoading(true);
    console.log('Token:', token); // Log the token to ensure it's present
  
    const formData = new FormData();
    formData.append('userId',userId)
    formData.append('caption', text); // Add text content
    formData.append('image', {
      uri: selectedImage,
      name: selectedImage.split('/').pop(), // Extract file name from URI
      type: 'image/jpeg', // Ensure this is the correct file type
    });
  
    console.log('Sending POST request...');
    console.log('Form Data:', formData);
  
    try {
      const response = await fetch(`${BASE_URL}/images/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const responseText = await response.text(); // Read response as text

      if (response.ok) {
        const result = JSON.parse(responseText); // Parse only if it's JSON
        Alert.alert('Success', 'Post uploaded successfully!');
        console.log('Upload successful:', result);
        router.push('/home')
        setText('');
        setSelectedImage(null);
        dispatch(
          addPost({
            id: result.id, 
            name: 'Current User', // Replace with actual user name if available
            imageUrl: 'https://via.placeholder.com/50', // User profile image
            postImage: {
              imageUrl: result.imageUrl, // URL from the server response
              caption: text,
            },
          })
        );
      } else {
        Alert.alert('Error', responseText || 'Failed to upload post.');
        console.error('Upload failed:', responseText);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      Alert.alert('Error', 'An error occurred while uploading the post.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('userToken');
      const userId = await AsyncStorage.getItem('userId');

      if (storedToken && userId ) {
        setToken(storedToken);
        setUserId(userId)
        console.log('Token retrieved:', storedToken);
      } else {
        console.log('No token found');
      }
    };

    fetchToken();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Create a Post</Text>

        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        ) : (
          <View style={styles.placeholderContainer}>
            <Text style={styles.placeholderText}>No Image Selected</Text>
          </View>
        )}

        <TextInput
          style={styles.textBox}
          placeholder="Type your text here"
          value={text}
          onChangeText={handleTextChange}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={openGallery} disabled={loading}>
          <Text style={styles.buttonText}>Choose Photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.addButton]}
          onPress={handlePost}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Add</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
    borderRadius: 10,
  },
  placeholderContainer: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  textBox: {
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    textAlignVertical: 'top', // Ensures text starts at the top
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28A745', // Different color for the Add button
  },
});
