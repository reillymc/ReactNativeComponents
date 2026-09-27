import { type FC, type Ref, useCallback } from "react";
import type { TextInput, TextInputChangeEvent } from "react-native";

import { InputBase, type InputBaseProps } from "./InputBase";

export type NumberInputBaseStyles = never;

export interface NumberInputBaseProps extends InputBaseProps {
    keyboardType?: "decimal-pad" | "number-pad";

    min?: number;

    max?: number;

    ref?: Ref<TextInput>;

    /**
     * Validates number entry and returns string.
     */
    onChangeText?: (text: string) => void;

    /**
     * Passes through raw event. No number validation performed.
     */
    onChange?: (e: TextInputChangeEvent) => void;
}

export const NumberInputBase: FC<NumberInputBaseProps> = ({
    onChangeText,
    keyboardType = "number-pad",
    ...props
}) => {
    const handleChangeText = useCallback(
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
        <InputBase
            {...props}
            keyboardType={keyboardType}
            onChangeText={handleChangeText}
        />
    );
};
