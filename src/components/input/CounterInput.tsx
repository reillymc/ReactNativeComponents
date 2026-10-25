import type { FC } from "react";
import { StyleSheet } from "react-native";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { useComponent } from "../shared";
import { InputAction } from "./InputAction";
import { InputRowContainer } from "./InputRowContainer";
import { InputScaffold, type InputScaffoldFieldProps } from "./InputScaffold";
import { NumberInputBase, type NumberInputBaseProps } from "./NumberInputBase";

export type CounterInputIcons = ComponentIconAssets<"decrease" | "increase">;

export interface CounterInputProps
    extends Omit<
            NumberInputBaseProps,
            | "value"
            | "onChange"
            | "onChangeText"
            | "style"
            | "theme"
            | "readOnly"
        >,
        InputScaffoldFieldProps {
    value?: string;
    onChange?: (value: string) => void;
    disableKeyboardInput?: boolean;
    interval?: number;
}

export const CounterInput: FC<CounterInputProps> = ({
    value,
    onChange,
    label,
    helpText,
    mandatory,
    hasError,
    disableKeyboardInput,
    disabled: disabledProp,
    variant = "regular",
    containerStyle,
    interval = 1,
    ...props
}) => {
    const { icons } = useComponent("counterInput");
    const disabled = disabledProp || !onChange;

    const numericValue = Number.parseFloat(value ?? "0") || 0;

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
                        onChange?.(
                            Math.max(
                                numericValue - interval,
                                props.min ?? 0,
                            ).toString(),
                        )
                    }
                />
                <NumberInputBase
                    clearButtonMode="never"
                    {...props}
                    value={value}
                    variant={variant}
                    onChangeText={(newValue) => {
                        if (!newValue) {
                            onChange?.("");
                            return;
                        }
                        onChange?.(
                            Math.min(
                                Math.max(
                                    Number.parseFloat(newValue ?? "0"),
                                    props.min ?? 0,
                                ),
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        );
                    }}
                    disabled={disabled}
                    readOnly={disableKeyboardInput}
                    style={styles.input}
                />
                <InputAction
                    {...icons.increase}
                    disabled={disabled}
                    variant={variant}
                    onPress={() =>
                        onChange?.(
                            Math.min(
                                numericValue + interval,
                                props.max ?? Number.MAX_VALUE,
                            ).toString(),
                        )
                    }
                />
            </InputRowContainer>
        </InputScaffold>
    );
};

const styles = StyleSheet.create({
    input: {
        flexGrow: 1,
        flexBasis: 0,
        textAlign: "center",
    },
});
