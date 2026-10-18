import type { FC, Ref } from "react";
import type { TextInput, TextInputChangeEvent } from "react-native";

import { InputBase, type InputBaseProps } from "./InputBase";

export type NumberInputBaseStyles = never;

const INTEGER_PATTERN = /^\d*/;
const DECIMAL_PATTERN = /^\d*\.?\d*/;
const LEADING_ZEROS_PATTERN = /^0+(?=\d)/;

const sanitizeNumber = (text: string, allowDecimal: boolean) => {
    const pattern = allowDecimal ? DECIMAL_PATTERN : INTEGER_PATTERN;
    const matched = text.match(pattern)?.[0] ?? "";

    return matched.replace(LEADING_ZEROS_PATTERN, "");
};

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
    const handleChangeText = (text: string) => {
        onChangeText?.(sanitizeNumber(text, keyboardType === "decimal-pad"));
    };

    return (
        <InputBase
            {...props}
            keyboardType={keyboardType}
            onChangeText={handleChangeText}
        />
    );
};
