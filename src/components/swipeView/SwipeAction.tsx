import React from "react";
import { StyleSheet } from "react-native";

import { IconButton } from "../buttons";

import { SwipeActionProps } from ".";

export const SwipeAction: React.FunctionComponent<SwipeActionProps> = actionProps => (
    <IconButton {...actionProps} rounded={false} style={styles.actionButton} />
);
const styles = StyleSheet.create({
    actionButton: {
        height: "100%",
        borderRadius: 0,
        width: 75,
    },
});
