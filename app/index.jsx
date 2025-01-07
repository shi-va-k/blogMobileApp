
import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useDispatch } from "react-redux";
import {BASE_URL} from '@env'

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
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, name }),
      });
      
      const result = await response.json();
      console.log(result,"dhgkjsl")
      console.log("KOIJHCGhuiohu", result.token)
      const tokenSucess = await AsyncStorage.setItem('userToken', result.token);

      if (response.ok) {
        await AsyncStorage.setItem("userToken", result.token);
        await AsyncStorage.setItem("userId", result.user.id);
        await AsyncStorage.setItem("userData", JSON.stringify(result.user)); // Save user info
      
        dispatch({
          type: "SET_USER",
          payload: {
            name: result.user.name,
            email: result.user.email,
            token: result.token,
            id:result.user.id
          },
        });
      
        Alert.alert("Success", "Login successful!");
        router.push("/home");
      }
       else {
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