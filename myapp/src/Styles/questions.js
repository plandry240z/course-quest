import { StyleSheet } from "react-native";
import { colors } from "./theme";

export const questions = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '800',
        color: colors.black,
        marginBottom: 24,
    },

    subtitle: {
        fontSize: 28,
        color: colors.stone,
        marginBottom: 12,
    },

    form: {
        gap: 12,
    },
});
