// Add.js
import React, { useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker'; // Import expo-image-picker

export default function Add() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

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
      mediaType: ImagePicker.MediaTypeOptions.Photo,
      allowsEditing: false,
      quality: 1,
    });

    if (result.cancelled) {
      console.log('Image selection was cancelled');
    } else if (result.uri) {
      console.log('Selected Image URI:', result.uri); // Debugging the URI
      setSelectedImage(result.uri); // Set the selected image URI
    } else {
      console.log('No URI returned from ImagePicker');
    }
  };

  // Function to handle text input changes
  const handleTextChange = inputText => {
    setText(inputText);
  };

  // Function to handle post submission
  const handlePost = async () => {
    if (!text || !selectedImage) {
      Alert.alert('Validation Error', 'Please enter text and select an image.');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('text', text); // Add text content
    formData.append('file', {
      uri: selectedImage,
      name: selectedImage.split('/').pop(), // Extract file name from URI
      type: 'image/jpeg', // Ensure this is the correct file type
    });

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Post uploaded successfully!');
        console.log('Upload successful:', result);
        setText('');
        setSelectedImage(null);
      } else {
        Alert.alert('Error', result.message || 'Failed to upload post.');
        console.error('Upload failed:', result);
      }
    } catch (error) {
      console.error('Error uploading post:', error);
      Alert.alert('Error', 'An error occurred while uploading the post.');
    } finally {
      setLoading(false);
    }
  };

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
