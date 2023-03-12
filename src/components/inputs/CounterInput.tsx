import React from "react";
import { StyleSheet, TextInput as RNTextInput, View } from "react-native";

import { ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton } from "../buttons";

import { BaseInput } from "./BaseInput";
import { NumberInput, NumberInputProps } from "./NumberInput";
import { ToggleInputProps } from "./ToggleInput";

export interface CounterInputStyles {
    width: number;
}

export interface CounterInputProps extends NumberInputProps {}

export const CounterInput = React.forwardRef<RNTextInput, CounterInputProps>(
    ({ onChangeText, label, ...props }, ref) => {
        const styles = useThemedStyles(createStyles, {});

        const value = parseInt(props.value ?? "0", 10);

        return (
            <BaseInput
                ref={ref}
                label={label}
                width="small"
                containerStyle={props.containerStyle}
                inputElement={
                    <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                        <IconButton
                            iconName="minus"
                            size="small"
                            variant="secondary"
                            rounded={false}
                            onPress={() => onChangeText?.(Math.max(value - 1, props.min ?? 0).toString())}
                            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                        />
                        <NumberInput {...props} style={styles.input} containerStyle={styles.inputContainer} />
                        <IconButton
                            iconName="plus"
                            size="small"
                            variant="secondary"
                            rounded={false}
                            onPress={() =>
                                onChangeText?.(Math.min(value + 1, props.max ?? Number.MAX_VALUE).toString())
                            }
                            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        />
                    </View>
                }
            />
        );
    },
);

(CounterInput as React.FunctionComponent).displayName = "CounterInput";

const createStyles = ({ styles: { counterInput } }: ThemedStyles, {}: Partial<ToggleInputProps>) => {
    const styles = StyleSheet.create({
        inputContainer: {
            width: counterInput.width,
        },
        input: {
            borderRadius: 0,
            textAlign: "center",
        },
    });
    return styles;
};
