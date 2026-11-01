import type { FC } from "react";

import { useFieldControlState } from "./FieldContext";
import { FieldTextInput, type FieldTextInputProps } from "./FieldTextInput";

export type FieldNumberInputProps = Omit<
    FieldTextInputProps,
    "clearButtonMode"
> & {
    keyboardType?: "decimal-pad" | "number-pad";
    onStep?: (direction: 1 | -1) => void;
};

const INTEGER_PATTERN = /^\d*/;
const DECIMAL_PATTERN = /^\d*\.?\d*/;
const LEADING_ZEROS_PATTERN = /^0+(?=\d)/;

const sanitizeNumber = (text: string, allowDecimal: boolean) => {
    const pattern = allowDecimal ? DECIMAL_PATTERN : INTEGER_PATTERN;
    const matched = text.match(pattern)?.[0] ?? "";

    return matched.replace(LEADING_ZEROS_PATTERN, "");
};

/**
 * Field text input that sanitizes numeric entry and maps ArrowUp/ArrowDown to
 * `onStep`.
 *
 * Should be used for any numeric form inputs.
 */
export const FieldNumberInput: FC<FieldNumberInputProps> = ({
    onChangeText,
    onKeyPress,
    onStep,
    keyboardType = "number-pad",
    ...props
}) => {
    const { interactive } = useFieldControlState();
    const canStep = interactive && !!onStep;

    const handleChangeText = (text: string) => {
        onChangeText?.(sanitizeNumber(text, keyboardType === "decimal-pad"));
    };

    const handleKeyPress: NonNullable<FieldNumberInputProps["onKeyPress"]> = (
        event,
    ) => {
        const key = event.nativeEvent.key;

        if (canStep && (key === "ArrowUp" || key === "ArrowDown")) {
            event.preventDefault?.();
            onStep?.(key === "ArrowUp" ? 1 : -1);
            return;
        }

        onKeyPress?.(event);
    };

    return (
        <FieldTextInput
            {...props}
            keyboardType={keyboardType}
            onChangeText={handleChangeText}
            onKeyPress={handleKeyPress}
        />
    );
};
