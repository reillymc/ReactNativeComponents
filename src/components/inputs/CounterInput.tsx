import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { IconButton } from "../button";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export interface CounterInputStyles {
    buttonWidth: number;
}

export interface CounterInputProps
    extends NumberInputBaseProps,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError"
        > {
    disableKeyboardInput?: boolean;
}

export const CounterInput: FC<CounterInputProps> = ({
    onChangeText,
    label,
    helpText,
    mandatory,
    hasError,
    disableKeyboardInput,
    disabled,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, {
        disabled,
        disableKeyboardInput,
    });

    const value = Number.parseInt(props.value ?? "0", 10) || 0;

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
        >
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
                <NumberInputBase
                    {...props}
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
                    disabled={disabled || disableKeyboardInput}
                    containerStyle={[styles.segment, styles.input]}
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
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { counterInput, baseInput } }: ThemedStyles,
    { disabled, disableKeyboardInput }: Partial<CounterInputProps>,
) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            backgroundColor: disabled
                ? baseInput.backgroundColorDisabled
                : baseInput.backgroundColor,
            borderRadius: baseInput.borderRadius,
            overflow: "hidden",
        },
        segment: {
            width: counterInput.buttonWidth,
        },
        label: {
            marginBottom: baseInput.labelMargin,
        },
        input: {
            borderRadius: 0,
            textAlign: "center",
            flexGrow: 1,
            backgroundColor: disableKeyboardInput
                ? baseInput.backgroundColor
                : undefined,
        },
    });
    return styles;
};
