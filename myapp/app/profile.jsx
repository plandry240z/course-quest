import { Text, View } from "react-native";
import { common } from "../src/Styles/common";
import { profile } from "../src/Styles/profile";


export default function Profile() {
    return (
        <View style={common.screen}>
            <View style={profile.profile_top}>
                <View style={profile.circle} />
                <Text style={profile.name}>Name</Text>
                <Text style={profile.info}>John Doe</Text>
                <Text style={profile.info}>Freshman</Text>
            </View>
            <Text style={profile.name}>Requirements</Text>
            <View style={profile.cardContainer}>
                <View style={profile.card} />
                <View style={profile.card} />
                <View style={profile.card} />
                <View style={profile.card} />
                <View style={profile.card} />
                <View style={profile.card} />
                <View style={profile.card} />
            </View>
            {/*<Button title="Go to Classes" onPress={() => router.push('/classes')} />
     */}
        </View>
    );
}














