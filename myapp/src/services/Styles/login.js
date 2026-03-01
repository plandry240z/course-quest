import { StyleSheet } from "react-native";
import { colors } from "./theme";
export const login = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'red',
    marginTop: 30,
    marginBottom: 10,
  },


welcomeText: {
    marginTop: 80,
    marginBottom: 25,
    fontSize: 30,
  },


textInput: {
    borderWidth: 3,
    borderColor: colors.stone,
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
    marginBottom: 16,
    color: colors.black,
    width: '90%',
  },


inputText: {
    textAlign: 'left',
    fontSize: 20,
    marginBottom: 10,
    marginTop: 15,
  },


loginButton: {
    backgroundColor: colors.bronco,
    padding: 16,
    borderRadius: 50,
    marginTop: 10,
    },


signUpText: {
    fontSize: 15,
    marginTop: 140,
},
});