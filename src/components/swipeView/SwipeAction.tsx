import React from "react";
import { StyleSheet } from "react-native";

import { FeatureButton, FeatureButtonProps } from "../buttons";

export interface SwipeActionProps extends Pick<FeatureButtonProps, "iconName" | "label" | "onPress" | "variant"> {}

export const SwipeAction: React.FunctionComponent<SwipeActionProps> = actionProps => (
    <FeatureButton {...actionProps} rounded={false} style={styles.actionButton} />
);
const styles = StyleSheet.create({
    actionButton: {
        height: "100%",
        borderRadius: 0,
        width: 75,
    },
});
