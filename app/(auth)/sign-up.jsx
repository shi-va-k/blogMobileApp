import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const SignUpPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !password || !mobile) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    // if (password !== confirmPassword) {
    //   Alert.alert("Error", "Passwords do not match");
    //   return;
    // }

    setIsLoading(true);

    try {
      const response = await fetch("https://1901-2406-b400-b4-8d92-e927-e76-86ca-6c97.ngrok-free.app/user/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password, mobile }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Registration successful! Redirecting to Login...");
        router.push("/sign-in");
      } else {
        Alert.alert("Error", result.message || "Registration failed");
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
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {/* <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      /> */}
      <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Sign Up"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/sign-in")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
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
    marginTop: 10,
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

export default SignUpPage;
