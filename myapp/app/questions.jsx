import { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { login } from "../src/Styles/login";
import { common } from "../src/Styles/common";
import { colors } from "../src/Styles/theme";
import { questions } from "../src/Styles/questions";


export default function HomePage({ navigation }) {
    const router = useRouter();
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');

    const API_URL = "http://localhost:8080";

const handleSubmit = async () => {
    try {
        const response = await fetch(`${API_URL}/profile`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userID: "testuser123",
                name: "Test User",
                school,
                major,
                year
            })
        });

        const data = await response.json();
        if (data.success) {
            router.push('/screens/Profile');
        }
    } catch (error) {
        console.error("Error saving profile:", error);
    }
};

    return (
        <View style={common.screen}>
            <Text style={questions.title}>Create Your Profile</Text>

            <View style={questions.form}>
                <Text style={questions.subtitle}>School:</Text>
                <TextInput style={login.textInput} placeholder="School" value={school} onChangeText={setSchool} />
                <Text style={questions.subtitle}>Major:</Text>
                <TextInput style={login.textInput} placeholder="Major" value={major} onChangeText={setMajor} />
                <Text style={questions.subtitle}>Year:</Text>
                <TextInput style={login.textInput} placeholder="Year" value={year} onChangeText={setYear} />
                <TouchableOpacity style={common.button} onPress={handleSubmit}>
                    <Text style={{ color: colors.white, textAlign: 'center', fontWeight: '600' }}>
                        SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



