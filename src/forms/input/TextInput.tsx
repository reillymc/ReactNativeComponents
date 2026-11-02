import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import {
    Field,
    type FieldComponentProps,
    FieldSurface,
    FieldTextInput,
    type FieldTextInputProps,
} from "../field";
import type { TextInputTheme } from "./TextInput.theme";

export type TextInputProps = FieldComponentProps &
    Omit<FieldTextInputProps, "style" | "theme"> & {
        theme?: DeepPartial<TextInputTheme>;
    };

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
    theme: themeOverrides,
    ...inputProps
}) => {
    const { theme } = useComponent("textInput", { themeOverrides });

    return (
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
                <FieldTextInput theme={theme.textInput} {...inputProps} />
            </FieldSurface>
        </Field>
    );
};
