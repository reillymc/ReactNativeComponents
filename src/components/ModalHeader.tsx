import React from "react";
import { View, StyleSheet } from "react-native";

import { Text } from "./Text";

export interface ModalHeaderProps {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    heading?: React.ReactNode;

    /**
     * Supports
     *
     * - `<Action />`
     * - `<IconAction />`
     */
    leftItem?: React.ReactNode;

    /**
     * Supports
     *
     * - `<Action />`
     * - `<IconAction />`
     */
    rightItem?: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ heading, leftItem, rightItem }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerItemLeft}>{leftItem}</View>
            <Text variant="heading">
                {typeof heading === "string" ? <Text variant="heading">{heading}</Text> : heading}
            </Text>
            <View style={styles.headerItemRight}>{rightItem}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 8,
        marginBottom: 20,
    },
    headerItemLeft: {
        flex: 1,
        marginLeft: 16,
        alignItems: "flex-start",
    },
    headerItemRight: {
        flex: 1,
        marginRight: 16,
        alignItems: "flex-end",
    },
});
