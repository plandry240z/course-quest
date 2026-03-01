import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../src/services/firebase";
import { login } from "../src/Styles/login";
import { colors } from "../src/Styles/theme";
import { router } from "expo-router";
import { createProfile } from "../src/services/api";

export default function AuthScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length >= 6 && !loading;
  }, [email, password, loading]);

  const safeMsg = (err) => err?.message ?? String(err);

  const testHealth = async () => {
    setError("");
    try {
      const response = await fetch("http://localhost:8080/health");
      const data = await response.json();
      console.log("Health check response:", data);
    } catch (err) {
      console.error("Health check failed:", err);
      setError(safeMsg(err));
    }
  };

  const handleSignUp = async () => {
    setError("");
    setLoading(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      setUserEmail(credential.user.email || "");
      router.replace("/questions");
    } catch (err) {
      setError(safeMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      setUserEmail(credential.user.email || "");

      await createProfile({
        name: "Test User",
        year: "Sophomore",
        major: "Computer Science",
        school: "Test University",
      });

      router.replace("/profile");
    } catch (err) {
      setError(safeMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setLoading(true);
    try {
      await signOut(auth);
      setUserEmail("");
    } catch (err) {
      setError(safeMsg(err));
    } finally {
      setLoading(false);
    }
  };

  const testFirestoreWrite = async () => {
    setError("");
    setLoading(true);
    try {
      await addDoc(collection(db, "test"), {
        uid: auth.currentUser?.uid,
        message: "Email/password auth works",
        createdAt: Date.now(),
      });
    } catch (err) {
      setError(safeMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.center}
        keyboardShouldPersistTaps="handled"
      >
        {/* Keep your circle background if you like */}
        <View style={login.circle} />

        <View style={styles.card}>
          <Text style={styles.title}>Welcome to Course Quest!</Text>
          <Text style={styles.subtitle}>Log in or create an account to continue</Text>

          <View style={styles.field}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="you@school.edu"
              placeholderTextColor={colors.stone}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={[login.textInput, styles.input]}
              editable={!loading}
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Minimum 6 characters"
              placeholderTextColor={colors.stone}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={[login.textInput, styles.input]}
              editable={!loading}
            />
          </View>

          {/* Primary action */}
          <TouchableOpacity
            style={[
              login.loginButton,
              styles.primaryBtn,
              (!canSubmit || loading) && styles.disabled,
            ]}
            onPress={handleLogin}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Text style={login.loginButtonText}>
              {loading ? "Please wait..." : "Log In"}
            </Text>
          </TouchableOpacity>

          {/* Secondary action */}
          <TouchableOpacity
            style={styles.linkWrap}
            onPress={handleSignUp}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={[login.signUpText, styles.linkText]}>
              Don’t have an account? Sign Up
            </Text>
          </TouchableOpacity>

          {/* Status + errors */}
          {userEmail ? (
            <View style={styles.pill}>
              <Text style={styles.pillText}>Logged in as: {userEmail}</Text>
            </View>
          ) : null}

          {error ? <Text style={styles.error}>{error}</Text> : null}

          {/* Dev tools grouped (optional) */}
          <View style={styles.devSection}>
            <Text style={styles.devTitle}>Dev Tools</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.smallBtn, loading && styles.disabled]}
                onPress={handleLogout}
                disabled={loading}
                activeOpacity={0.85}
              >
                <Text style={styles.smallBtnText}>Log Out</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.smallBtn, loading && styles.disabled]}
                onPress={testFirestoreWrite}
                disabled={loading}
                activeOpacity={0.85}
              >
                <Text style={styles.smallBtnText}>Test Firestore</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.ghostBtn, loading && styles.disabled]}
              onPress={testHealth}
              disabled={loading}
              activeOpacity={0.85}
            >
              <Text style={styles.ghostText}>Test Backend Health</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors?.cream || "#F7F3EE",
  },
  center: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 14,
    opacity: 0.65,
    marginBottom: 14,
  },
  field: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    opacity: 0.75,
    marginBottom: 6,
  },
  input: {
    marginTop: 0,
  },
  primaryBtn: {
    marginTop: 16,
  },
  linkWrap: {
    marginTop: 12,
    alignItems: "center",
  },
  linkText: {
    textDecorationLine: "underline",
  },
  pill: {
    marginTop: 14,
    alignSelf: "center",
    backgroundColor: "#F5F5F4",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillText: {
    fontSize: 13,
    opacity: 0.85,
  },
  error: {
    marginTop: 10,
    color: "#B91C1C",
    fontSize: 13,
    lineHeight: 18,
  },
  devSection: {
    marginTop: 18,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#E7E5E4",
  },
  devTitle: {
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.6,
    opacity: 0.5,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  smallBtn: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F5F5F4",
    borderWidth: 1,
    borderColor: "#E7E5E4",
  },
  smallBtnText: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.85,
  },
  ghostBtn: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  ghostText: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
});
