import React from "react";
import { TextInput as RNTextInput, TextInputProps as RNTextInputProps, StyleSheet } from "react-native";
import { ThemeContext, useThemedStyles } from "./ThemeProvider";

export type InputWidth = "small" | "large" | "full";

type TextInputStyles = {
    width: { [key in InputWidth]: string | number };
    borderRadius: number;

    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
};

interface TextInputProps extends RNTextInputProps {
    width?: InputWidth;
}

const TextInput = React.forwardRef<RNTextInput, TextInputProps>(({ style, width, ...props }, ref) => {
    const styles = useThemedStyles(createStyles, { width });

    return <RNTextInput ref={ref} style={[styles.input, style]} {...props} />;
});

TextInput.displayName = "TextInput";

export { TextInput, TextInputProps, TextInputStyles };

const createStyles = ({ styles: { textInput } }: ThemeContext, { width = "large" }: TextInputProps) =>
    StyleSheet.create({
        input: {
            width: textInput.width[width],
            minWidth: textInput.width[width],
            height: 50,
            borderRadius: 5,
            backgroundColor: "#f2f2f2",
            padding: 8,
            fontSize: 16,
            fontFamily: textInput.fontFamilyWeight,
            display: "flex",
        },
    });
