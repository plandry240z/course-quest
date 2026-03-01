import { TouchableOpacity, Text, View } from 'react-native';
import { useRouter } from 'expo-router';
import { common } from "../src/Styles/common";
import { colors } from "../src/Styles/theme";


export default function HomeScreen({ navigation }) {
    const router = useRouter();
    return (
        <View style={common.screen}>
            <Text>Home Screen</Text>
            <TouchableOpacity style={common.button} onPress={() => router.push('/screens/Profile')}>
                <Text style={{ color: colors.white, textAlign: 'center', fontWeight: '600' }}>
                    GO TO PROFILE
                </Text>
            </TouchableOpacity>

        </View>
    );
}


