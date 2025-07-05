import type { FC, Ref } from "react";
import {
    type TextInput as DefaultTextInput,
    StyleSheet,
    View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton } from "../button";
import { Text } from "../text";
import { NumberInput, type NumberInputProps } from "./NumberInput";

export interface CounterInputStyles {
    width: number;
}

export interface CounterInputProps extends NumberInputProps {
    disableKeyboardInput?: boolean;
    ref?: Ref<DefaultTextInput | null>;
}

export const CounterInput: FC<CounterInputProps> = ({
    onChangeText,
    label,
    disableKeyboardInput,
    disabled,
    ref,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, {
        disabled,
        disableKeyboardInput,
    });

    const value = Number.parseInt(props.value ?? "0", 10) || 0;

    return (
        <View style={props.containerStyle}>
            {label && (
                <View style={styles.label}>
                    {typeof label === "string" ? (
                        <Text variant="label">{label}</Text>
                    ) : (
                        label
                    )}
                </View>
            )}
            <View style={styles.container}>
                <IconButton
                    iconSet={AntDesign} // TODO: decouple
                    iconName="minus"
                    variant="secondary"
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.max(value - 1, props.min ?? 0).toString(),
                        )
                    }
                    style={{
                        container: {
                            borderRadius: 0,
                            width: { medium: styles.segment.width },
                        },
                    }}
                />
                <NumberInput
                    {...props}
                    ref={ref}
                    onChangeText={(newValue) => {
                        if (!newValue) {
                            onChangeText?.("");
                            return;
                        }
                        onChangeText?.(
                            Math.min(
                                Math.max(
                                    Number.parseInt(newValue ?? "0", 10),
                                    props.min ?? 0,
                                ),
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        );
                    }}
                    style={styles.input}
                    disabled={disabled || disableKeyboardInput}
                    containerStyle={styles.segment}
                />
                <IconButton
                    iconSet={AntDesign}
                    iconName="plus"
                    variant="secondary"
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.min(
                                value + 1,
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        )
                    }
                    style={{
                        container: {
                            borderRadius: 0,
                            width: { medium: styles.segment.width },
                        },
                    }}
                />
            </View>
        </View>
    );
};

const createStyles = (
    { styles: { counterInput, baseInput } }: ThemedStyles,
    { disabled, disableKeyboardInput }: Partial<CounterInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignSelf: "flex-start",
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
        },
        segment: {
            width: counterInput.width,
        },
        label: {
            marginBottom: baseInput.labelMargin,
        },
        input: {
            borderRadius: 0,
            textAlign: "center",
            backgroundColor: disableKeyboardInput
                ? baseInput.backgroundColor
                : undefined,
        },
    });
    return styles;
};
