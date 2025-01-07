import { View, Text, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-web'
import { router } from 'expo-router'

const User = ({item}) => {

  return (
    <View className=' p-5 flex flex-row justify-between'>
    <View className='flex flex-row gap-3 items-center'>
        <View>
         <Image source={ 'https://via.placeholder.com/150'} className='w-10 h-10 rounded-[40px] bg-black'/>
        </View>
      <View>
        <Text className=''>{item?.name}</Text>
      </View>
    </View>
    <View className='bg-blue-400 flex justify-center items-center px-5 rounded-md'>
    <Pressable onPress={() => {
  router.push({
    pathname: '/requestChatRoom',
    params: {
      name: item?.name,
      receivedId: item?._id,
    },
  });
}}>
        <Text className='text-white'>
        Chat
        </Text>
       
       </Pressable>
    </View>
    </View>

  )
}

export default User