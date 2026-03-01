import { View, Button, Text } from "react-native";
import { router } from "expo-router";
export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
  <Button
        title="Go to Login"
        onPress={() => router.push("/login")}
      />
    </View>
  );
}
