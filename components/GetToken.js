import AsyncStorage from '@react-native-async-storage/async-storage';

const getToken = async () => {
    
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData')
    const userObject = JSON.parse(userData)
    const userdataa = {
        token : token,
        userData: userObject
    }
    if (userdataa !== null) {
      // Token exists
      console.log('Token: in get userdataa', userdataa);
      return userdataa;
    } else {
      // No token found
      console.log('No token found');
      return null;
    }
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};


export default getToken