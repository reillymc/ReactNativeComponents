import React, { type FC, type Ref } from "react";
import type {
    TextInput as DefaultTextInput,
    NativeSyntheticEvent,
    TextInputChangeEventData,
} from "react-native";

import { BaseInput, type BaseInputProps } from "./BaseInput";

export type NumberInputStyles = {};

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

    ref?: Ref<DefaultTextInput | null>;
}

export const NumberInput: FC<NumberInputProps> = ({
    onChangeText,
    keyboardType = "number-pad",
    ref,
    ...props
}) => {
    const handleChangeText = React.useCallback(
        (text: string) => {
            if (onChangeText) {
                const regExp =
                    keyboardType === "decimal-pad"
                        ? /^([0-9]*\.*[0-9]*)/g
                        : /^([0-9]*)/g;
                const validatedString = text.match(regExp)?.[0];
                const num = Number.parseFloat(validatedString ?? "");

                if (Number.isNaN(num) || validatedString !== num.toString()) {
                    onChangeText?.(validatedString ?? "");

                    return;
                }

                onChangeText?.(num.toString());
            }
        },
        [onChangeText, keyboardType],
    );

    return (
        <BaseInput
            {...props}
            ref={ref}
            keyboardType={keyboardType}
            onChangeText={handleChangeText}
        />
    );
};
