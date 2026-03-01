import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../src/services/firebase";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleSignUp = async () => {
    setError("");
    try {
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      setUserEmail(credential.user.email || "");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async () => {
    setError("");
    try {
      const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
      setUserEmail(credential.user.email || "");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = async () => {
    setError("");
    try {
      await signOut(auth);
      setUserEmail("");
    } catch (err) {
      setError(err.message);
    }
  };

  const testFirestoreWrite = async () => {
    setError("");
    try {
      await addDoc(collection(db, "test"), {
        uid: auth.currentUser?.uid,
        message: "Email/password auth works",
        createdAt: Date.now(),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />

      <TextInput
        placeholder="Password (min 6 chars)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Log In" onPress={handleLogin} />
      <Button title="Log Out" onPress={handleLogout} />
      <Button title="Test Firestore Write" onPress={testFirestoreWrite} />

      {userEmail ? <Text>Logged in as: {userEmail}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  error: {
    color: "red",
  },
});