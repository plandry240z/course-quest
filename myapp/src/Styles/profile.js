import { StyleSheet } from "react-native";
import { colors } from "./theme";
export const profile = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    info: {
        fontSize: 18,
        marginBottom: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        backgroundColor: colors.stone,
        width: '48%',
        height: 100,
        marginBottom: 16,
        borderRadius: 8,
    },
    circle:{
        backgroundColor: colors.stone,
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    profile_top:{
        alignItems: 'center',
        marginBottom: 16,
    }
});