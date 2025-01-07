import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Pressable, Alert, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import getToken from '../GetToken'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather'
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios'
import { useRoute } from '@react-navigation/native'
import {BASE_URL} from '@env'

const RequestChatRoom = () => {
  const route = useRoute();  
  const navigation = useNavigation();
  const { name, receivedId } = route.params;
  const [tokenn, setTokenn] = useState('');
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    const gettingToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa);
    };
    gettingToken();
  }, []);

  const userId = tokenn.userData?.id;

  const sendRequest = async () => {
    try {
      const userData = {
        senderId: userId,  
        receiverId: receivedId,  
        message: message,
      };

      // console.log("Payload to send:", userData);

      const response = await fetch(
        `${BASE_URL}/sendRequest`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        setMessage('');
        Alert.alert("Your request has been shared, wait for the user to accept your request");
      } else {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        Alert.alert("Error", "Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      Alert.alert("Error", "Failed to send the message. Please try again.");
    }
  };

  return (
    <KeyboardAvoidingView className="h-full" behavior="padding">

        <View className='flex '>
          <View className='flex justify-between flex-row pr-20 gap-3 py-3 items-center bg-gray-200'>
          <Icon
            name="arrow-back"
            size={25}
            color="black"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
            className='w-fit'
            />
            <Image source={ 'https://via.placeholder.com/150'} className='w-10 h-10 rounded-[40px] bg-black'/>
               <Text className='w-full text-lg font-bold'>{name}</Text>
          </View>
   
        </View>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }} className='bg-gray-200'>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <Entypo name="emoji-happy" size={20} color="gray" />

          <TextInput
            value={message}
            onChangeText={setMessage}
            className="flex-1 h-12 border rounded-md px-4"
            placeholder="Type a message"
          />

          <Entypo name="camera" size={20} color="gray" />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>

            <Feather name="mic" size={20} color="gray" />

            <Pressable onPress={sendRequest}>
              <Ionicons name="send" size={24} color="#007BFF" style={{ marginLeft: 8 }} />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default RequestChatRoom;
