import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../src/services/firebase";
import { common } from "../src/Styles/common";
import { login } from "../src/Styles/login";
import { colors } from "../src/Styles/theme";

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
    <View style={login.container}>
      <View style={login.circle} />
      <Text style={login.welcomeText}>Welcome to Course Quest!</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor ={colors.stone}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={login.textInput}
      />

      <TextInput
        placeholder="Password (min 6 chars)"
        placeholderTextColor ={colors.stone}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={login.textInput}
      />

      <TouchableOpacity style={login.signUpLinkWrap} onPress={handleSignUp}>
        <Text style={login.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={login.loginButton} onPress={handleLogin}>
        <Text style={login.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={login.loginButton} onPress={handleLogout}>
        <Text>Log Out</Text>
      </TouchableOpacity>
      <TouchableOpacity style={login.loginButton} onPress={testFirestoreWrite}>
        <Text style={login.loginButtonText}>Test Firestore Write</Text>
      </TouchableOpacity>

      {userEmail ? <Text style={login.statusText}>Logged in as: {userEmail}</Text> : null}
      {error ? <Text style={login.errorText}>{error}</Text> : null}
    </View>
  );
}