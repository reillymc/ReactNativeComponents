import type { FC } from "react";
import { StyleSheet } from "react-native";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { InputAction } from "./InputAction";
import { InputRowContainer } from "./InputRowContainer";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type CounterInputIcons = ComponentIconAssets<"decrease" | "increase">;

export interface CounterInputProps
    extends Omit<NumberInputBaseProps, "style" | "inputStyle">,
        InputScaffoldFieldProps {
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
    const [styles, { icons }] = useThemedStyles("counterInput", createStyles);

    const value = Number.parseFloat(props.value ?? "0") || 0;

    return (
        <InputScaffold
            label={label}
            helpText={helpText}
            mandatory={mandatory}
            hasError={hasError}
            containerStyle={containerStyle}
        >
            <InputRowContainer disabled={disabled}>
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
                    clearButtonMode="never"
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
                                    Number.parseFloat(newValue ?? "0"),
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
            </InputRowContainer>
        </InputScaffold>
    );
};

const createStyles = ({ styles: { inputBase } }: ThemedStyles) =>
    StyleSheet.create({
        input: {
            flexGrow: 1,
            flexBasis: 0,
            textAlign: "center",
            // Override disabled style. TODO: indicate keyboard enabled/disabled visually
            backgroundColor: inputBase.container.backgroundColor.enabled,
        },
    });
