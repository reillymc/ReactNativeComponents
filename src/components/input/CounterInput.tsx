import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import { InputAction } from "./InputAction";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export interface CounterInputProps
    extends Omit<NumberInputBaseProps, "style" | "inputStyle">,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError" | "containerStyle"
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
    disabled = false,
    variant = "regular",
    containerStyle,
    ...props
}) => {
    const styles = useThemedStyles(createStyles, { disabled });

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
                    iconSet={AntDesign} // TODO: decouple
                    iconName="minus"
                    variant={variant}
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.max(value - 1, props.min ?? 0).toString(),
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
                    iconSet={AntDesign}
                    iconName="plus"
                    disabled={disabled}
                    variant={variant}
                    onPress={() =>
                        onChangeText?.(
                            Math.min(
                                value + 1,
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
        },
    });
