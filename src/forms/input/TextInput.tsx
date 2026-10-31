import type { FC } from "react";

import {
    Field,
    type FieldComponentProps,
    FieldSurface,
    FieldTextInput,
    type FieldTextInputProps,
} from "../field";

export type TextInputProps = FieldComponentProps &
    Omit<FieldTextInputProps, "style">;

/**
 * Single-line text field.
 */
export const TextInput: FC<TextInputProps> = ({
    label,
    hideLabel,
    help,
    error,
    required,
    disabled,
    readOnly,
    variant,
    style,
    ...inputProps
}) => (
    <Field
        label={label}
        hideLabel={hideLabel}
        help={help}
        error={error}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        variant={variant}
        style={style}
    >
        <FieldSurface>
            <FieldTextInput {...inputProps} />
        </FieldSurface>
    </Field>
);
