import type { FC } from "react";
import { StyleSheet, View } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { InputAction } from "./InputAction";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type CounterInputIcons = ComponentIconAssets<"decrease" | "increase">;

export interface CounterInputProps
    extends Omit<NumberInputBaseProps, "style" | "inputStyle">,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError" | "containerStyle"
        > {
    disableKeyboardInput?: boolean;
    interval?: number;
}

export const CounterInput: FC<CounterInputProps> = ({
    onChangeText,
    label,
    helpText,
    mandatory,
    hasError,
    disableKeyboardInput,
    disabled = false,
    variant = "regular",
    containerStyle,
    interval = 1,
    ...props
}) => {
    const [styles, { icons }] = useThemedStyles("counterInput", createStyles, {
        props: { disabled },
    });

    const value = Number.parseInt(props.value ?? "0", 10) || 0;

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
            containerStyle={containerStyle}
        >
            <View style={styles.container}>
                <InputAction
                    {...icons.decrease}
                    variant={variant}
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.max(
                                value - interval,
                                props.min ?? 0,
                            ).toString(),
                        )
                    }
                />
                <NumberInputBase
                    {...props}
                    variant={variant}
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
                    inputStyle={styles.input}
                />
                <InputAction
                    {...icons.increase}
                    disabled={disabled}
                    variant={variant}
                    onPress={() =>
                        onChangeText?.(
                            Math.min(
                                value + interval,
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        )
                    }
                />
            </View>
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { inputBase } }: ThemedStyles,
    { disabled }: Required<Pick<CounterInputProps, "disabled">>,
) =>
    StyleSheet.create({
        container: {
            flexDirection: "row",
            borderRadius: inputBase.container.borderRadius,
            overflow: "hidden",
            backgroundColor:
                inputBase.container.backgroundColor[
                    disabled ? "disabled" : "enabled"
                ],
        },
        input: {
            flexGrow: 1,
            textAlign: "center",
            // Override disabled style. TODO: indicate keyboard enabled/disabled visually
            backgroundColor: inputBase.container.backgroundColor.enabled,
        },
    });
