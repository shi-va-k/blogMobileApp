// import { View, Text } from 'react-native'
// import React from 'react'
// import { Link } from 'expo-router'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { ScrollView } from 'react-native-web'
// // import SignIn from './(auth)/sign-in'
// import SignIn from './(auth)/sign-in'
// import { StatusBar } from 'expo-status-bar'


// const Index = () => {
//   return (
//     // <View>
//     //   <Text >index</Text>
//     //   <Link href="/home" >go to home
//     //   </Link>
      
//     // </View>
//     <SafeAreaView className = 'w-full flex items-center justify-center h-full'>

//         <ScrollView >
//             <View className=''>
//               <SignIn /> 
//               {/* <SignUp />  */}
//             </View>
//         </ScrollView>
//             <StatusBar backgroundColor='#161622' style='light' />
//     </SafeAreaView>
//   )
// }

// export default Index





// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
// import { useRouter } from "expo-router"; 

// const LoginPage = () => {
//   const router = useRouter();
// //   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");
//   const [isLoading, setIsLoading] = useState(false);


//   const handleLogin = async () => {
//     if (!name || !password) {
//       Alert.alert("Error", "Name and password are required");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       const response = await fetch("https://ba7f-183-82-105-21.ngrok-free.app/user/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({  password, name }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         Alert.alert("Success", "Login successful!"); 
//         router.push('/home')
//       } else {
//         Alert.alert("Error", result.message || "Login failed");
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", "Unable to connect to the server");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Login</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="name"
//         value={name}
//         onChangeText={setName}
//         // keyboardType="phone-pad"
//       />
//       {/* <TextInput
//         style={styles.input}
//         placeholder="Mobile Number"
//         value={mobile}
//         onChangeText={setMobile}
//         keyboardType="phone-pad"
//       /> */}
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
//         <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Login"}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => router.push("/sign-up")}>
//         <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     padding: 20,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },
//   input: {
//     height: 50,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     backgroundColor: "#fff",
//   },
//   button: {
//     height: 50,
//     backgroundColor: "#007bff",
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 18,
//   },
//   linkText: {
//     marginTop: 15,
//     color: "#007bff",
//     textAlign: "center",
//     textDecorationLine: "underline",
//   },
// });

// export default LoginPage;

import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // Check if the user is already logged in
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       const token = await AsyncStorage.getItem("token");

//       if (token) {
//         // If the token exists, navigate to the home page
//         router.push("/home");
//       }
//     };

//     checkLoginStatus();
//   }, [router]);

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Name and password are required");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://1901-2406-b400-b4-8d92-e927-e76-86ca-6c97.ngrok-free.app/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, name }),
      });

      const result = await response.json();
      console.log(result,"dhgkjsl")
      console.log("KOIJHCGhuiohu")
      const tokenSucess=await AsyncStorage.setItem('userToken', result.token);

      if (response.ok) {
        Alert.alert("Success", "Login successful!");
        dispatch({
          type: "SET_USER",
          payload: {
            name: result.user.name,
            email: result.user.email,
            token: result.token,
          },
        });

        // Save the token in AsyncStorage
        await AsyncStorage.setItem("token", result.token);

        // Navigate to the home page
        router.push("/home");
      } else {
        Alert.alert("Error", result.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/sign-up")}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  linkText: {
    marginTop: 15,
    color: "#007bff",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default LoginPage;
