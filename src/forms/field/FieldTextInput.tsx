import type { FC, Ref } from "react";
import {
    TextInput,
    type TextInputInstance,
    type TextInputProps,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { defineStyles, useComponent, useForwardedRef } from "../../internal";
import { useSystems } from "../../theme/useSystems";
import { fieldAria } from "./a11y";
import type { FieldTheme } from "./Field.theme";
import { useFieldControlState } from "./FieldContext";
import { useFieldControlFocus } from "./useFieldControlFocus";

export type FieldTextInputTheme = FieldTheme["text"];

export type FieldTextInputProps = Omit<TextInputProps, "editable"> & {
    /**
     * Slot-level keyboard lock for controls that disable typing without
     * disabling the field. Field disabled/read-only state comes from context.
     */
    readOnly?: boolean;
    theme?: DeepPartial<FieldTextInputTheme>;
    ref?: Ref<TextInputInstance>;
};

/**
 * Themed text input bound to field context.
 *
 * Should be used as the base of any textual form input elements.
 */
export const FieldTextInput: FC<FieldTextInputProps> = ({
    readOnly: readOnlyProp,
    theme: themeOverrides,
    style,
    onFocus,
    onBlur,
    onPressIn,
    onPressOut,
    multiline = false,
    scrollEnabled,
    onChangeText,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState,
    accessibilityValue,
    nativeID,
    tabIndex,
    ref,
    ...props
}) => {
    const {
        field,
        disabled,
        readOnly: fieldReadOnly,
        interactive,
    } = useFieldControlState();
    const { getDisabledStyle, maxFontSizeMultiplier } = useSystems();
    const { styles, theme } = useComponent("field", {
        themeOverrides: { text: themeOverrides },
        createStyles,
    });

    const inputRef = useForwardedRef<TextInputInstance>(ref);
    const focusInput = () => inputRef.current?.focus();
    const fieldFocus = useFieldControlFocus({
        focusable: !disabled,
        pressEvents: true,
        focus: focusInput,
    });

    return (
        <TextInput
            {...fieldFocus.getFocusProps({
                onFocus,
                onBlur,
                onPressIn,
                onPressOut,
            })}
            {...props}
            ref={inputRef}
            editable={interactive && !readOnlyProp}
            focusable={!disabled}
            tabIndex={disabled ? -1 : tabIndex}
            maxFontSizeMultiplier={maxFontSizeMultiplier}
            placeholderTextColor={theme.text.placeholderColor}
            nativeID={nativeID}
            {...fieldAria(field, {
                label: accessibilityLabel,
                readOnly: fieldReadOnly || !!readOnlyProp,
                hint: accessibilityHint,
                state: accessibilityState,
                value: accessibilityValue,
            })}
            style={[
                fieldFocus.focusRingStyle,
                styles.input,
                getDisabledStyle(!fieldFocus.isNestedInSurface && disabled),
                style,
            ]}
            multiline={multiline}
            scrollEnabled={scrollEnabled ?? multiline}
            onChangeText={onChangeText}
        />
    );
};

const createStyles = defineStyles((theme: FieldTheme) => ({
    input: {
        alignSelf: "stretch",
        flex: 1,
        minWidth: 0,
        fontSize: theme.text.fontSize,
        fontFamily: theme.text.fontFamily,
        fontWeight: theme.text.fontWeight,
        color: theme.text.color,
    },
}));
