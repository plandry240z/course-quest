import { StyleSheet } from "react-native";
import { colors } from "./theme";
export const common = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 16,
    },
    card: {
        backgroundColor: colors.stone,
        width: '48%',
        height: 100,
        marginBottom: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.bronco,
        padding: 16,
        borderRadius: 50,
    },
    input: {
        borderWidth: 3,
        borderColor: colors.stone,
        borderRadius: 8,
        padding: 12,
        backgroundColor: colors.white,
        marginBottom: 16,
        color: colors.black,
    },
});