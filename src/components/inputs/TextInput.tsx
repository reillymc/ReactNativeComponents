import React from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet } from "react-native";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

import { ThemedStyles, useTheme, useThemedStyles } from "../../hooks";
import { InputWidth } from ".";

export interface TextInputStyles {
    // textColor: string;
    // placeholderTextColor: string;
    // backgroundColor: string;
    // backgroundColorDisabled: string;
}

export interface TextInputProps extends RNTextInputProps {
    width?: InputWidth;
    disabled?: boolean;
    modalSupport?: boolean;
}

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>(
    ({ style, width, disabled = false, modalSupport, ...props }, ref) => {
        const styles = useThemedStyles(createStyles, { width, disabled });
        const {
            styles: { common },
        } = useTheme();

        return modalSupport ? (
            <BottomSheetTextInput ref={ref as any} editable={!disabled} style={[styles.input, style]} {...props} />
        ) : (
            <RNTextInput
                ref={ref}
                editable={!disabled}
                placeholderTextColor={common.input.placeholderTextColor}
                style={[styles.input, style]}
                {...props}
            />
        );
    },
);

TextInput.displayName = "TextInput";

const createStyles = ({ styles: { common } }: ThemedStyles, { width = "large", disabled }: TextInputProps) =>
    StyleSheet.create({
        input: {
            display: "flex",
            width: common.input.width[width],
            minWidth: common.input.width[width],
            height: common.input.height,
            borderRadius: common.input.borderRadius,
            backgroundColor: disabled ? common.input.backgroundColorDisabled : common.input.backgroundColor,
            padding: common.input.padding,
            fontSize: common.input.fontSize,
            fontFamily: common.input.fontFamilyWeight,
            color: common.input.textColor,
        },
    });
