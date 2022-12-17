import React from "react";
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputChangeEventData } from "react-native";

import { BaseInput, BaseInputProps } from "./BaseInput";

export interface NumberInputStyles {}

export interface NumberInputProps extends BaseInputProps {
    keyboardType?: "decimal-pad" | "number-pad";

    min?: number;

    max?: number;

    /**
     * Validates number entry and returns string.
     */
    onChangeText?: (text: string) => void;

    /**
     * Passes through raw event. No number validation performed.
     */
    onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
}

export const NumberInput = React.forwardRef<RNTextInput, NumberInputProps>(
    ({ onChangeText, onChange, keyboardType = "number-pad", min, max, ...props }, ref) => {
        const handleChangeText = React.useCallback(
            (text: string) => {
                if (onChangeText) {
                    const regExp = keyboardType === "decimal-pad" ? /^([0-9]*\.*[0-9]*)/g : /^([0-9]*)/g;
                    const validatedString = text.match(regExp)?.[0];
                    let num = parseFloat(validatedString ?? "");

                    if (Number.isNaN(num) || validatedString !== num.toString()) {
                        if (onChangeText) onChangeText(validatedString ?? "");
                        return;
                    }

                    if (onChangeText) onChangeText(num.toString());
                }
            },
            [onChangeText, keyboardType, min, max],
        );

        return <BaseInput {...props} ref={ref} keyboardType={keyboardType} onChangeText={handleChangeText} />;
    },
);

NumberInput.displayName = "NumberInput";
