import { useState } from "react";
import { Platform, StyleSheet, type ViewInstance } from "react-native";
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
        | "controllerRef"
        | "clearButtonMode"
        | "maxLength"
        | "autoFocus"
        | "items"
        | "value"
        | "defaultValue"
        | "onChange"
        | "inputValue"
        | "defaultInputValue"
        | "onInputChange"
        | "onSubmit"
        | "submitOnEnter"
        | "selectBehavior"
        | "disableOpenOnFocus"
        | "allowsCustomValue"
        | "filterItems"
        | "minimumSearchLength"
        | "maxSuggestionCount"
        | "containerPosition"
        | "menuMount"
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
    menuMount,
    theme: themeOverrides,
    ...props
}: ComboboxInputProps<T>) => {
    const { theme } = useComponent("comboboxInput", { themeOverrides });
    const surfaceAnchorRef = useAnimatedRef<ViewInstance>();
    const inlineNative = menuMount === "inline" && Platform.OS !== "web";
    const [inlineMenuVisible, setInlineMenuVisible] = useState(false);

    const fieldStyle = inlineNative
        ? [
              styles.inlineField,
              inlineMenuVisible && styles.inlineFieldVisible,
              style,
          ]
        : style;

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
            style={fieldStyle}
        >
            <FieldSurface ref={surfaceAnchorRef} theme={theme.surface}>
                <ComboboxInputBase
                    anchorRef={surfaceAnchorRef}
                    menuMount={menuMount}
                    onMenuVisibilityChange={
                        inlineNative ? setInlineMenuVisible : undefined
                    }
                    theme={theme}
                    {...props}
                />
            </FieldSurface>
        </Field>
    );
};

const styles = StyleSheet.create({
    inlineField: {
        position: "relative",
        zIndex: 1,
        elevation: 1,
    },
    inlineFieldVisible: {
        zIndex: 2,
        elevation: 2,
    },
});
