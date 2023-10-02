import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  auth,
  collection,
  addDoc,
  firestore,
} from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
// import { USERS } from "@env";
import { styles } from "../Login/loginStyles";

const SignUp = () => {
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const navigation: { reset: any; navigate: any } = useNavigation();

  const users = "users";
  // const users = USERS;

  const handleSignup = async () => {
    setLoading(true);
    try {
      const fetchedUserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (fetchedUserCredential) {
        const userData = {
          userId: fetchedUserCredential.user.uid,
          email: fetchedUserCredential.user.email,
          role: "Subscriber",
          joined: new Date().toString(),
        };

        const userCollections = collection(firestore, users);
        await addDoc(userCollections, userData);

        // dispatch(loginSuccess(userData));
        navigation.reset({ index: 0, routes: [{ name: "Home" }] });
        setLoading(false);
      }
    } catch (error: any) {
      const errorMessage = error.message;

      if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email-Already-In-Use");
      } else {
        setError("Password should be at least 6 characters");
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.heading}>Sign Up</Text>
      {loading && <ActivityIndicator />}
      {error && <Text>{error}</Text>}
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
          secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError("");
          }}
        />
        {!loading && (
          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <Text>
          Already have an account? {""}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;
