import type { View } from "react-native";
import { useAnimatedRef } from "react-native-reanimated";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../../internal";
import { Field, type FieldComponentProps, FieldSurface } from "../../field";
import type { ComboboxInputTheme } from "./ComboboxInput.theme";
import {
    ComboboxInputBase,
    type ComboboxInputBaseProps,
} from "./ComboboxInputBase";

export type ComboboxInputProps<T = string> = FieldComponentProps &
    Pick<
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
    > & {
        theme?: DeepPartial<ComboboxInputTheme>;
    };

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
    theme: themeOverrides,
    onChange,
    ...props
}: ComboboxInputProps<T>) => {
    const { theme } = useComponent("comboboxInput", { themeOverrides });
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
            <FieldSurface ref={surfaceAnchorRef} theme={theme.surface}>
                <ComboboxInputBase
                    anchorRef={surfaceAnchorRef}
                    theme={theme}
                    onChange={onChange}
                    {...props}
                />
            </FieldSurface>
        </Field>
    );
};
