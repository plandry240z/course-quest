import { useState } from "react";
import { TouchableOpacity, Text, View, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { common } from "../../src/styles/common";
import { colors } from "../../src/styles/theme";
import { questions } from "../../src/styles/questions";


export default function HomePage({ navigation }) {
    const router = useRouter();
    const [school, setSchool] = useState('');
    const [major, setMajor] = useState('');
    const [year, setYear] = useState('');


    const handleSubmit = () => {
        console.log({ school, major, year });
        router.push('/screens/Profile');
    };




    return (
        <View style={common.screen}>
            <Text style={questions.title}>Create Your Profile</Text>


            <View style={questions.form}>
                <Text style={questions.subtitle}>School:</Text>
                <TextInput style={common.input} placeholder="School" value={school} onChangeText={setSchool} />
                <Text style={questions.subtitle}>Major:</Text>
                <TextInput style={common.input} placeholder="Major" value={major} onChangeText={setMajor} />
                <Text style={questions.subtitle}>Year:</Text>
                <TextInput style={common.input} placeholder="Year" value={year} onChangeText={setYear} />
                <TouchableOpacity style={common.button} onPress={handleSubmit}>
                    <Text style={{ color: colors.white, textAlign: 'center', fontWeight: '600' }}>
                        SIGN UP
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}



