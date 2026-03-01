import { StyleSheet } from "react-native";
import { colors } from "./theme";
export const login = StyleSheet.create({
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "red",
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
    width: '90%',
    alignSelf: 'center',
    color: colors.black,
  },


loginButton: {
    backgroundColor: colors.bronco,
    padding: 16,
    borderRadius: 50,
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },

loginButtonText:{
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
},

signUpLinkWrap:{
  marginTop:20,
  alignItems: 'center',
},

signUpText: {
  color: colors.stone,
  fontSize: 16,
  textDecorationLine: 'underline',
},

errorText: {
  color: colors.red,
  fontSize: 16,
  marginTop: 10,
  textAlign: 'center',
},
statusText: {
  color: colors.green,
  fontSize: 16,
  marginTop: 10,
  textAlign: 'center',
}
});
