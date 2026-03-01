import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const login = StyleSheet.create({
  // Use this on the outer View
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  // Optional: wrap your content in a card (recommended)
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 18,
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    // Shadow (Android)
    elevation: 5,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.06)",
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.bronco, // nicer than red, matches theme
    opacity: 0.18,
    position: "absolute",
    top: -50,
    right: -40,
  },

  welcomeText: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 6,
    color: colors.black,
  },

  subtitleText: {
    fontSize: 14,
    textAlign: "center",
    color: colors.stone,
    opacity: 0.85,
    marginBottom: 18,
  },

  // Optional label style if you want "Email" / "Password" labels
  inputLabel: {
    width: "100%",
    fontSize: 13,
    fontWeight: "600",
    color: colors.black,
    opacity: 0.7,
    marginBottom: 6,
    marginTop: 10,
  },

  textInput: {
    width: "100%",
    borderWidth: 1.5,
    borderColor: "rgba(0,0,0,0.12)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    backgroundColor: "rgba(0,0,0,0.02)",
    color: colors.black,
    fontSize: 16,
  },

  // If you want a little spacing between inputs
  inputSpacing: {
    marginBottom: 12,
  },

  loginButton: {
    width: "100%",
    backgroundColor: colors.bronco,
    paddingVertical: 14,
    borderRadius: 16,
    marginTop: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  loginButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },

  // Optional secondary button (for Log Out / test buttons)
  secondaryButton: {
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.04)",
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.08)",
  },

  secondaryButtonText: {
    color: colors.black,
    fontSize: 14,
    fontWeight: "700",
    opacity: 0.85,
  },

  signUpLinkWrap: {
    marginTop: 14,
    alignItems: "center",
  },

  signUpText: {
    color: colors.stone,
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // Status / error pills look nicer than plain text
  errorPill: {
    marginTop: 12,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(185, 28, 28, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(185, 28, 28, 0.18)",
  },
  errorText: {
    color: colors.red,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "600",
  },

  statusPill: {
    marginTop: 12,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "rgba(22, 163, 74, 0.10)",
    borderWidth: 1,
    borderColor: "rgba(22, 163, 74, 0.20)",
  },
  statusText: {
    color: colors.green,
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    fontWeight: "700",
  },
});
