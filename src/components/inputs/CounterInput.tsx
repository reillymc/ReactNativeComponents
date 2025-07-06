import type { FC } from "react";
import { type DimensionValue, StyleSheet, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStylesWithOverride } from "../../hooks";
import { IconButtonBase, type IconButtonBaseStyles } from "../button";
import { InputScaffold, type InputScaffoldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export interface CounterInputStyles {
    button: {
        width: DimensionValue;
        borderRadius: IconButtonBaseStyles["container"]["borderRadius"];
    };
}

export interface CounterInputProps
    extends Omit<NumberInputBaseProps, "style">,
        Pick<
            InputScaffoldProps,
            "label" | "helpText" | "mandatory" | "hasError"
        > {
    disableKeyboardInput?: boolean;
    style?: DeepPartial<CounterInputStyles>;
}

export const CounterInput: FC<CounterInputProps> = ({
    onChangeText,
    label,
    helpText,
    mandatory,
    hasError,
    disableKeyboardInput,
    disabled,
    style,
    ...props
}) => {
    const [styles, { counterInput }] = useThemedStylesWithOverride(
        createStyles,
        { counterInput: style },
        { disabled, disableKeyboardInput },
    );

    const value = Number.parseInt(props.value ?? "0", 10) || 0;

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
        >
            <View style={styles.container}>
                <IconButtonBase
                    iconSet={AntDesign} // TODO: decouple
                    iconName="minus"
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.max(value - 1, props.min ?? 0).toString(),
                        )
                    }
                    style={{ container: counterInput.button }}
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
                    style={styles.input}
                />
                <IconButtonBase
                    iconSet={AntDesign}
                    iconName="plus"
                    disabled={disabled}
                    onPress={() =>
                        onChangeText?.(
                            Math.min(
                                value + 1,
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        )
                    }
                    style={{ container: counterInput.button }}
                />
            </View>
        </InputScaffold>
    );
};

const createStyles = (
    { styles: { baseInput } }: ThemedStyles,
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
