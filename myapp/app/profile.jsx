import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
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
  const [busy, setBusy] = useState(false);

  const canSubmit = useMemo(() => {
    return email.trim().length > 0 && password.length >= 6 && !busy;
  }, [email, password, busy]);

  const testHealth = async () => {
    try {
      const response = await fetch("http://localhost:8080/health");
      const data = await response.json();
      console.log("Health check response:", data);
    } catch (err) {
      console.error("Health check failed:", err);
      setError(err?.message ?? String(err));
    }
  };

  const handleSignUp = async () => {
    setError("");
    setBusy(true);
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      setUserEmail(credential.user.email || "");
      router.replace("/questions");
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    setBusy(true);
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
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  const handleLogout = async () => {
    setError("");
    setBusy(true);
    try {
      await signOut(auth);
      setUserEmail("");
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  const testFirestoreWrite = async () => {
    setError("");
    setBusy(true);
    try {
      await addDoc(collection(db, "test"), {
        uid: auth.currentUser?.uid,
        message: "Email/password auth works",
        createdAt: Date.now(),
      });
    } catch (err) {
      setError(err?.message ?? String(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Optional decorative circle from your existing style */}
        <View style={login.circle} />

        <View style={styles.card}>
          <Text style={styles.title}>Course Quest</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="you@school.edu"
              placeholderTextColor={colors.stone}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
              editable={!busy}
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="Minimum 6 characters"
              placeholderTextColor={colors.stone}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              editable={!busy}
            />
          </View>

          {userEmail ? (
            <View style={styles.statusPill}>
              <Text style={styles.statusText}>Logged in as: {userEmail}</Text>
            </View>
          ) : null}

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.primaryButton, (!canSubmit || busy) && styles.disabled]}
            onPress={handleLogin}
            disabled={!canSubmit}
            activeOpacity={0.85}
          >
            <Text style={styles.primaryButtonText}>
              {busy ? "Working..." : "Log In"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={handleSignUp}
            disabled={busy}
            activeOpacity={0.8}
          >
            <Text style={styles.linkText}>Don’t have an account? Sign Up</Text>
          </TouchableOpacity>

          {/* Debug / dev actions grouped + softer */}
          <View style={styles.divider} />
          <View style={styles.devRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={handleLogout}
              disabled={busy}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Log Out</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={testFirestoreWrite}
              disabled={busy}
              activeOpacity={0.85}
            >
              <Text style={styles.secondaryButtonText}>Test Firestore</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.ghostButton}
            onPress={testHealth}
            disabled={busy}
            activeOpacity={0.85}
          >
            <Text style={styles.ghostButtonText}>Test Backend Health</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors?.cream ?? "#F7F3EE",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 22,
    padding: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 4,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 14,
  },
  fieldGroup: {
    marginTop: 10,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    opacity: 0.8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E7E5E4",
    backgroundColor: "#FAFAFA",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  statusPill: {
    marginTop: 12,
    backgroundColor: "#F5F5F4",
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "center",
  },
  statusText: {
    fontSize: 13,
    opacity: 0.85,
  },
  errorText: {
    marginTop: 10,
    color: "#B91C1C",
    fontSize: 13,
    lineHeight: 18,
  },
  primaryButton: {
    marginTop: 14,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: colors?.primary ?? "#111827",
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  disabled: {
    opacity: 0.5,
  },
  linkButton: {
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors?.primary ?? "#111827",
    textDecorationLine: "underline",
  },
  divider: {
    height: 1,
    backgroundColor: "#E7E5E4",
    marginVertical: 14,
  },
  devRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#F5F5F4",
    borderWidth: 1,
    borderColor: "#E7E5E4",
  },
  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.85,
  },
  ghostButton: {
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },
  ghostButtonText: {
    fontSize: 13,
    fontWeight: "700",
    opacity: 0.7,
  },
});













