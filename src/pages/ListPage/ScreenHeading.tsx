import React from "react";
import { Text, StyleSheet } from "react-native";

interface ScreenHeadingProps {
    heading: string;
}

const ScreenHeading: React.FC<ScreenHeadingProps> = ({ heading }) => <Text style={styles.heading}>{heading}</Text>;

export { ScreenHeading };

const styles = StyleSheet.create({
    heading: {
        fontFamily: "Comfortaa-Bold",
        fontSize: 36,
    },
});
