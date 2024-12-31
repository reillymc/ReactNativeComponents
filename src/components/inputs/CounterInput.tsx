import React from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { FeatureButton } from "../buttons";
import { Text } from "../Text";

import { NumberInput, NumberInputProps } from "./NumberInput";

export interface CounterInputStyles {
    width: number;
}

export interface CounterInputProps extends NumberInputProps {
    disableKeyboardInput?: boolean;
}

export const CounterInput = React.forwardRef<RNTextInput, CounterInputProps>(
    ({ onChangeText, label, disableKeyboardInput, disabled, ...props }, ref) => {
        const styles = useThemedStyles(createStyles, { disabled, disableKeyboardInput });

        const value = parseInt(props.value ?? "0", 10);

        return (
            <View style={props.containerStyle}>
                {label && (
                    <View style={styles.label}>
                        {typeof label === "string" ? <Text variant="label">{label}</Text> : label}
                    </View>
                )}
                <View style={styles.container}>
                    <FeatureButton
                        iconName="minus"
                        size="small"
                        variant="flat"
                        disabled={disabled}
                        rounded={false}
                        onPress={() => onChangeText?.(Math.max(value - 1, props.min ?? 0).toString())}
                        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                    />
                    <NumberInput
                        {...props}
                        ref={ref}
                        style={styles.input}
                        disabled={disabled || disableKeyboardInput}
                        containerStyle={styles.inputContainer}
                    />
                    <FeatureButton
                        iconName="plus"
                        size="small"
                        variant="flat"
                        disabled={disabled}
                        rounded={false}
                        onPress={() => onChangeText?.(Math.min(value + 1, props.max ?? Number.MAX_VALUE).toString())}
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                    />
                </View>
            </View>
        );
    },
);

(CounterInput as React.FunctionComponent).displayName = "CounterInput";

const createStyles = (
    { styles: { counterInput, baseInput } }: ThemedStyles,
    { disabled, disableKeyboardInput }: Partial<CounterInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignSelf: "flex-start",
            backgroundColor: disabled ? baseInput.backgroundColorDisabled : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
        },
        inputContainer: {
            width: counterInput.width,
        },
        label: {
            marginBottom: baseInput.labelMargin,
        },
        input: {
            borderRadius: 0,
            textAlign: "center",
            backgroundColor: disableKeyboardInput ? baseInput.backgroundColor : undefined,
        },
    });
    return styles;
};
