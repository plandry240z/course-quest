import { Text, View } from "react-native";
import { common } from "../src/Styles/common";
import { profile } from "../src/Styles/profile";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:8080";


export default function Profile() {
    const [profileData, setProfileData] = useState(null);
    useEffect(() => {
    fetch(`${API_URL}/profile/testuser123`)
        .then(res => res.json())
        .then(data => setProfileData(data));
    }, []);
    return (
        <View style={common.screen}>
            <View style={profile.profile_top}>
                <View style={profile.circle} />
                <Text style={profile.info}>{profileData?.name || "John Doe"}</Text>
                <Text style={profile.info}>{profileData?.year || "Freshman"}</Text>
                <Text style={profile.info}>{profileData?.major || "Major"}</Text>
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














