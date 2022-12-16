import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { Text } from "../Text";

export interface BaseInputProps {
    /**
     * Supports
     *
     * - `<Text />`
     * - string
     */
    label?: React.ReactNode;

    /**
     * Input element component.
     */
    children?: React.ReactNode;
}

export const BaseInput: React.FunctionComponent<BaseInputProps> = ({ label, children }) => {
    const styles = useThemedStyles(createStyles, {});

    return (
        <View>
            {label && (
                <View style={styles.label}>
                    {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                </View>
            )}
            {children}
        </View>
    );
};

BaseInput.displayName = "BaseInput";

const createStyles = ({ styles: { common } }: ThemedStyles, {}: BaseInputProps) =>
    StyleSheet.create({
        label: {
            marginBottom: common.input.labelMarginBottom,
        },
    });
