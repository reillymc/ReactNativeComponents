import type { View } from "react-native";
import { useAnimatedRef } from "react-native-reanimated";

import { Field, type FieldComponentProps, FieldSurface } from "../../field";
import {
    ComboboxInputBase,
    type ComboboxInputBaseProps,
} from "./ComboboxInputBase";

export interface ComboboxInputTheme {
    panelGap: number;
}

export type ComboboxInputProps<T = string> = Pick<
    ComboboxInputBaseProps<T>,
    | "autoCapitalize"
    | "returnKeyType"
    | "returnKeyLabel"
    | "onBlur"
    | "placeholder"
    | "onChangeText"
    | "controllerRef"
    | "clearButtonMode"
    | "maxLength"
    | "onSubmitEditing"
    | "autoFocus"
    | "items"
    | "value"
    | "defaultValue"
    | "onChange"
    | "openOnFocus"
    | "allowsCustomValue"
    | "blurOnSelect"
    | "filterItems"
    | "minimumSearchLength"
    | "maxSuggestionCount"
    | "containerPosition"
    | "ref"
> &
    FieldComponentProps;

export const ComboboxInput = <T,>({
    label,
    hideLabel,
    help,
    error,
    required,
    disabled,
    readOnly,
    variant,
    style,
    onChange,
    ...props
}: ComboboxInputProps<T>) => {
    const surfaceAnchorRef = useAnimatedRef<View>();

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
            <FieldSurface ref={surfaceAnchorRef}>
                <ComboboxInputBase
                    anchorRef={surfaceAnchorRef}
                    onChange={onChange}
                    {...props}
                />
            </FieldSurface>
        </Field>
    );
};
