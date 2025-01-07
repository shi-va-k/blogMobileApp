import { View, Text, SafeAreaView, FlatList, Image, Button, Pressable } from 'react-native';
import getToken from '../GetToken';
import React, { useEffect, useState } from 'react';
import User from '../User';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Chatting from './Chatting';
import {BASE_URL} from '@env'


const Chat = () => {
  const [users, setUsers] = useState([]);
  const [tokenn, setTokenn] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = tokenn?.userData?.id;

  // Function to fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/user/getAll`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error('Error fetching users:', error.message);
    }
  };

  // Function to fetch requests (accessible outside of useEffect as well)
  const fetchRequests = async () => {
    if (!userId) return; // Ensure userId is available

    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/getRequests/${userId}`);
      setRequests(response.data);  // Update the requests state
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleAccept = async (requestId) => {
    try {
      if (!userId || !requestId) {
        console.error('Invalid userId or requestId');
        return;
      }
  
      const response = await axios.post(
        `${BASE_URL}/acceptRequest`,
        { userId : userId,
           requestId: requestId }
      );
  
      if (response.status === 200) {
        console.log('Request accepted successfully:', response.data);
        await fetchRequests(); // Refresh the list after accepting
      } else {
        console.error('Failed to accept request:', response.status);
      }
    } catch (error) {
      console.error('Error accepting request:', error.message);
    }
  };
  const [chats, setChats] = useState([])
  const getUser = async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`)
      setChats(response.data)
    } catch (error) {
      console.log(error, 'Error fetching user')
      throw error
    }
  }

  useEffect(()=>{
    if(userId){
  getUser()
    }
  }, [userId])
  
console.log("usersi", chats)
  // Delete Request Handler
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/deleteRequest/${id}`);
      fetchRequests(); // Refresh requests after deleting
    } catch (error) {
      console.error('Error deleting request:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
    const gettingToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa);
    };
    gettingToken();
  }, []); // Run once when component mounts

  useEffect(() => {
    fetchRequests(); // Fetch requests on userId change
  }, [userId]);  // When userId changes, fetch requests
  const options = ['Chats', 'Calls', 'Profile'];
  return (
    <SafeAreaView>
      <View className='px-5'>
        {requests.map((itemm) => (
          <View key={itemm._id} className='py-3 flex flex-row justify-between'>
            {/* Content section: Image, Name, Message */}
            <View className='flex flex-row gap-4 items-center justify-center'>
              <Image source={{ uri: 'https://via.placeholder.com/150' }} className='w-10 h-10 rounded-[40px] bg-black' />
              <View>
                <Text>{itemm.from.name}</Text>
                <Text className='text-gray-500'>{itemm.message}</Text>
              </View>
            </View>
            
            {/* Actions: Accept Button and Delete Icon */}
            <View className='flex flex-row gap-2 justify-center items-center mt-3'>
              {/* Accept Button */}
              <Pressable onPress={() => handleAccept(itemm?._id)}>
                <Text className='bg-blue-400 px-5 py-2 rounded-md text-white'>Accept</Text>
              </Pressable>
              
              {/* Delete Icon */}
              <Icon 
                name="delete" 
                size={30} 
                color="red" 
                onPress={() => handleDelete(itemm._id)} 
                style={{ marginLeft: 10 }}  // Adds margin between button and icon
              />
            </View>
          </View>
        ))}
      </View>


    {/* Chats Section */}
    <View>
      <Text className='mx-5'>Chats</Text>
  {options?.includes('Chats') && (
    chats?.length > 0 ? (
      <View className='mx-5'>
        {chats.map((item, index) => (
          <Chatting item={item} key={item._id}/>
        ))}
      </View>
    ) : (
      <View className="py-10 px-5">
        <Text>No chats available</Text>
      </View>
    )
  )}
</View>


      <View>
        <Text className='text-center text-lg font-bold mt-7'>People using Signal</Text>
      </View>

      <FlatList
        data={users}
        renderItem={({ item }) => <User item={{ ...item, id: item.user_id }} />}
        keyExtractor={(item) => item.user_id}
      />
    </SafeAreaView>
  );
};

export default Chat;

