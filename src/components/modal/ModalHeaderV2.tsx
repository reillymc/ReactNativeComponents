import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "../Text";
import { IconActionV2 } from "../buttons";

export interface ModalHeaderV2Props {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    heading?: React.ReactNode;

    onClose?: () => void;
}

export const ModalHeaderV2: React.FC<ModalHeaderV2Props> = ({ heading, onClose }) => {
    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerItemLeft}>
                <Text variant="heading">
                    {typeof heading === "string" ? <Text variant="heading">{heading}</Text> : heading}
                </Text>
            </View>
            <View style={styles.headerItemRight}>
                <IconActionV2 iconName="x" variant="flat" onPress={onClose} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    headerItemLeft: {
        flex: 1,
        marginLeft: 16,
        alignItems: "flex-start",
    },
    headerItemRight: {
        marginRight: 16,
        alignItems: "flex-end",
    },
});
