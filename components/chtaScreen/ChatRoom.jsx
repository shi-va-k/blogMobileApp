// // import { View, Text } from 'react-native'
// // import React, { useEffect, useState } from 'react'
// // import getToken from '../GetToken';
// // import { useNavigation } from 'expo-router';
// // import { useRoute } from '@react-navigation/native'
// // // import { Icon } from 'react-native-vector-icons/Icon';
// // import Icon from 'react-native-vector-icons/Ionicons'
// // import Entypo from 'react-native-vector-icons/Entypo'
// // import Feather from 'react-native-vector-icons/Feather'
// // import { Ionicons } from '@expo/vector-icons'
// // import { Image } from 'react-native';
// // import { useRouter } from 'expo-router';

// // const ChatRoom = () => {
// //     const [tokenn, setTokenn] = useState('')
// //     const router = useRouter();
// //     const route = useRoute();  // Get the route params
// //     const { name, receiverId, image } = router.query;
// //   const navigation = useNavigation();
// //     useEffect(() => {
// //         const gettingToken = async () => {
// //           const userdataa = await getToken();
// //           setTokenn(userdataa);
// //         };
// //         gettingToken();
// //       }, []);
    
// //       const userId = tokenn.userData?.id;
// //       console.log(router.query, 'namess')
// //   return (
// //     <View>
// //        {/* Header Section */}
// //              <View className='flex '>
// //                <View className='flex justify-between flex-row pr-20 gap-3 py-3 items-center bg-gray-200'>
// //                <Icon
// //                  name="arrow-back"
// //                  size={25}
// //                  color="black"
// //                  onPress={() => navigation.goBack()}
// //                  style={{ marginLeft: 10 }}
// //                  className='w-fit'
// //                  />
// //                  <Image source={ 'https://via.placeholder.com/150'} className='w-10 h-10 rounded-[40px] bg-black'/>
// //                     <Text className='w-full text-lg font-bold'>hi</Text>
// //                </View>
        
// //              </View>

// //     </View>
// //   )
// // }

// // export default ChatRoom

// import { View, Text, KeyboardAvoidingView, ScrollView, TextInput, Pressable, Alert, Image } from 'react-native'

// import React, { useEffect, useState } from 'react';
// import { useSearchParams, useRouter, useNavigation } from 'expo-router';
// import getToken from '../GetToken';
// import { useLocalSearchParams } from 'expo-router';
// import Icon from 'react-native-vector-icons/Ionicons'
// import Entypo from 'react-native-vector-icons/Entypo'
// import Feather from 'react-native-vector-icons/Feather'
// import { Ionicons } from '@expo/vector-icons'
// import axios from 'axios';
// import { useSocketContext } from '../../SocketContext';


// const ChatRoom = () => {
//   const navigation = useNavigation()
//   const { name, receiverId, image } = useLocalSearchParams(); // Access the query parameters
//   const [tokenn, setTokenn] = useState('');
//   const { socket } = useSocketContext()

//   useEffect(() => {
//     const gettingToken = async () => {
//       const userdataa = await getToken();
//       setTokenn(userdataa);
//     };
//     gettingToken();
//   }, []);

//   const userId = tokenn?.userData?.id;

//   console.log({ name, receiverId, image }, 'Route Params');
// const [message, setMessage] = useState('');
// const sendMessage = async(senderId, receiverId)=>{
//   try {
//     await axios.post('https://396c-183-82-105-21.ngrok-free.app/sendMessage',{
//       senderId,
//       receiverId,
//       message
//     })
//     socket.emit('sendMessage',{senderId, receiverId, message} )

//     setMessage('')
//     // setTimeout(()=>{

//     // }, 100)
//   } catch (error) {
//     console.log(error, 'error')
//   }
// }
//   return (
//     // <View>
//     //   {/* Header Section */}
//     //   <View>
//     //     <View className="flex-row items-center bg-gray-200 py-4">
//     //       {/* Back Button */}
//     //       <Icon
//     //              name="arrow-back"
//     //              size={25}
//     //              color="black"
//     //              onPress={() => navigation.goBack()}
//     //              style={{ marginLeft: 10 }}
//     //              className='w-fit mr-5'
//     //              />

//     //       {/* Profile Image */}
//     //       <Image
//     //         source={{ uri: image || 'https://via.placeholder.com/150' }}
//     //         className="w-10 h-10 rounded-full bg-black mr-2"
//     //       />

//     //       {/* Chat Title */}
//     //       <Text className="text-lg font-bold">{name}</Text>
//     //     </View>
//     //   </View>

//     //   {/* Chat Content */}
//     //   <Text>Chatting with {name}</Text>
//     //   <Text>Receiver ID: {receiverId}</Text>
//     // </View>
//     <KeyboardAvoidingView className="h-full" behavior="padding">

//     {/* Header Section */}
//     <View className='flex '>
//       <View className='flex justify-between flex-row pr-20 gap-3 py-3 items-center bg-gray-200'>
//       <Icon
//         name="arrow-back"
//         size={25}
//         color="black"
//         onPress={() => navigation.goBack()}
//         style={{ marginLeft: 10 }}
//         className='w-fit'
//         />
//         <Image source={ 'https://via.placeholder.com/150'} className='w-10 h-10 rounded-[40px] bg-black'/>
//            <Text className='w-full text-lg font-bold'>{name}</Text>
//       </View>

//     </View>

//   {/* Receiver's Name at the top of the chat */}
 

//   {/* Chat Input Section (Fixed at Bottom) */}
//   <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }} className='bg-gray-200'>
//     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//       {/* Emoji Icon */}
//       <Entypo name="emoji-happy" size={20} color="gray" />

//       {/* Text Input */}
//       <TextInput
//         value={message}
//         onChangeText={setMessage}
//         className="flex-1 h-12 border rounded-md px-4"
//         placeholder="Type a message"
//       />

//       {/* Camera Icon */}
//       <Entypo name="camera" size={20} color="gray" />

//       {/* Mic Icon + Send Emoji */}
//       <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//         {/* Mic Icon */}
//         <Feather name="mic" size={20} color="gray" />

//         {/* Send Emoji Icon */}
//         <Pressable onPress={()=> sendMessage(userId, receiverId)}>
//           <Ionicons name="send" size={24} color="#007BFF" style={{ marginLeft: 8 }} />
//         </Pressable>
//       </View>
//     </View>
//   </View>
// </KeyboardAvoidingView>
//   );
// };

// export default ChatRoom;


import React, { useEffect, useState } from 'react';
import { Text, View, TextInput, Pressable, Image, KeyboardAvoidingView } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useSocketContext } from '../../SocketContext';
import getToken from '../GetToken';
import { ScrollView } from 'react-native';
import {BASE_URL} from '@env'


const ChatRoom = () => {
  const navigation = useNavigation();
  const { name, receiverId, image } = useLocalSearchParams();
  const [tokenn, setTokenn] = useState('');
  const { socket } = useSocketContext(); // Get socket from context
  const [messages, setMessages] = useState([])
  console.log(receiverId, "receiverIdreceiverIdreceiverId")
  useEffect(() => {
    const gettingToken = async () => {
      const userdataa = await getToken();
      setTokenn(userdataa);
    };
    gettingToken();
  }, []);

  const userId = tokenn?.userData?.id;

  const [message, setMessage] = useState('');

  const listMessages =()=>{
    const { socket } = useSocketContext();
    useEffect(()=>{
  socket?.on("newMessage", newMessage =>{
    newMessage.sholudShake = true;
    setMessages([...messages, newMessage])
  })
  return ()=> socket.off('newMessage')
    },[messages, socket, setMessages])
  }
  listMessages()

  const sendMessage = async (senderId, receiverId) => {
    if (!socket) {
      console.log('Socket is not connected');
      return; // Don't attempt to send if socket is not ready
    }

    try {
      await axios.post(`${BASE_URL}/sendMessage`, {
        senderId,
        receiverId,
        message,
      });

      socket.emit('sendMessage', { senderId, receiverId, message });

      setMessage('');
      // fetchMessages()

      setTimeout(()=>{
        fetchMessages()
      }, 100)

    } catch (error) {
      console.log(error, 'Error sending message');
    }
  };

  const fetchMessages = async()=>{
    try {
      const senderId = userId
      // const receiverId = receiverId
      console.log({ senderId, receiverId }, "Params being sent to backend");


      const response = await axios.get(`${BASE_URL}/messages`, {
        params:{senderId, receiverId}
      })
      setMessages(response.data)
    } catch (error) {
      console.log(error, 'error')
    }
  }
  useEffect(() => {
    if (receiverId && userId) {
      fetchMessages(); // Fetch messages only when `receiverId` and `userId` are available
    }
  }, [receiverId, userId]);

console.log(messages,'messagesraw')

const formatTime = (timestamp) => {
  if (!timestamp) return ''; // Handle cases where the timestamp is undefined or null

  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes with leading zeroes if necessary
  const formattedHours = hours % 12 || 12; // Convert 24-hour time to 12-hour
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const amOrPm = hours >= 12 ? 'PM' : 'AM';

  return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
};

  return (
    <KeyboardAvoidingView className="h-full" behavior="padding">
      {/* Header Section */}
      <View className="flex">
        <View className="flex justify-between flex-row pr-20 gap-3 py-3 items-center bg-gray-200">
          <Icon
            name="arrow-back"
            size={25}
            color="black"
            onPress={() => navigation.goBack()}
            style={{ marginLeft: 10 }}
            className="w-fit"
          />
          <Image source={{ uri: image || 'https://via.placeholder.com/150' }} className="w-10 h-10 rounded-[40px] bg-black" />
          <Text className="w-full text-lg font-bold">{name}</Text>
        </View>
      </View>
      {/* <ScrollView>
        {messages.map((item, index)=>{

          return(
            <Pressable style={[
              item?.senderId?._id == userId ? {
                alignSelf: 'flex-end',
                backgroundColor: '#DCF8C6',
                padding: 8,
                maxWidth: "60%",
                borderRadius: 7,
                margin: 10
              } : {
                alignSelf: 'flex-start',
                backgroundColor: 'white',
                padding:8,
                margin: 10,
                borderRadius: 7,
                maxWidth: '60%'
              }
            ]}>
              <Text style={{fontSize:13, textAlign: 'left'}}>{item?.message}</Text>
              <Text style={{textAlign: 'right', fontSize:9, color:'gray', marginTop:3}}>{formatTime(item?.timeStamp)}</Text>
            </Pressable>
          )
        })}
      </ScrollView> */}
<ScrollView>
  {messages.map((item, index) => {
    return (
      <Pressable
        key={item._id || index} // Add a unique key for each message
        style={[
          item.senderId._id === userId
            ? {
                alignSelf: 'flex-end',
                backgroundColor: '#DCF8C6',
                padding: 8,
                maxWidth: '60%',
                borderRadius: 7,
                margin: 10,
              }
            : {
                alignSelf: 'flex-start',
                backgroundColor: 'white',
                padding: 8,
                margin: 10,
                borderRadius: 7,
                maxWidth: '60%',
              },
        ]}
      >
        <Text style={{ fontSize: 13, textAlign: 'left' }}>{item.message}</Text>
        <Text style={{ textAlign: 'right', fontSize: 9, color: 'gray', marginTop: 3 }}>
          {formatTime(item.timestamp)} {/* Use timestamp to format the time */}
        </Text>
      </Pressable>
    );
  })}
</ScrollView>

      {/* Chat Input Section (Fixed at Bottom) */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 10 }} className="bg-gray-200">
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

            <Pressable onPress={() => sendMessage(userId, receiverId)}>
              <Ionicons name="send" size={24} color="#007BFF" style={{ marginLeft: 8 }} />
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatRoom;
