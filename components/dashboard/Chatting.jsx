import { View, Text, Pressable, Image, TextInput, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useNavigation } from 'expo-router';
import getToken from '../GetToken';
import io from 'socket.io-client';
import { BASE_URL } from '@env'

const Chatting = ({ item }) => {
  const [tokenn, setTokenn] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const userId = tokenn?.userData?.id;

  // const socket = io('http://localhost:5001'); 
  const socket = io(`${BASE_URL}`);

  useEffect(() => {
    const gettingToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa);
    };

    gettingToken();
    if (userId) {
      socket.emit('join', userId);
    }

    socket.on('receiveMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  // console.log(item, 'itteemmrrr')
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/chatRoom',
          params: {
            name: item?.name,
            receiverId: item?._id,
            image: item?.image,
          },
        })
      }
    >
      <View className="flex flex-row items-center gap-4">
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          className="w-10 h-10 rounded-full bg-black"
        />
        <View className="flex-1">
          <Text className="text-base font-bold" numberOfLines={1} ellipsizeMode="tail">
            {item?.name}
          </Text>
          <Text className="mt-1 text-gray-400">
            Chat with {item?.name}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
export default Chatting