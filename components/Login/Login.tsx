import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { signInWithEmailAndPassword, auth } from "../config/firebase";
import { styles } from "./loginStyles";
import { useNavigation } from "@react-navigation/native";
import { useUserState } from "../recoilState/userState";

const LogIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { previousRoute, currentUser, isUserLoading } = useUserState();

  const navigation = useNavigation() as any;

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential) {
        navigation.navigate(previousRoute);

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: previousRoute }],
        // });
      }
    } catch (error: any) {
      setError(error.message);
      if (error.message === "Firebase: Error (auth/wrong-password).") {
        setError("Wrong-Password");
      } else {
        setError("User-Not-Found");
      }
      setLoading(false);
    }
  };

  if (currentUser?.email && !isUserLoading) {
    navigation.navigate("Home");
  }
  return (
    <View style={styles.signupContainer}>
      <Text style={styles.heading}>Login</Text>
      {loading && <ActivityIndicator />}
      <Text>{error}</Text>

      <View style={styles.signupForm}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setError("");
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
          secureTextEntry
        />

        {!loading && (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}
        <View style={{ marginTop: 10 }}>
          <Text>
            Forgot Password ?{" "}
            <Text
              style={styles.link}
              onPress={() => {
                // Replace this with navigation logic for React Native
              }}
            >
              Reset-Password
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Text>
          Don't have an Account?
          <Text
            style={styles.link}
            onPress={() => {
              // Replace this with navigation logic for React Native
            }}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LogIn;
