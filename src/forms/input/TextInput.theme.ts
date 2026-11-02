import type { ThemeFactory } from "../../theme/theme";
import type { FieldTextInputTheme } from "../field";

export type TextInputTheme = {
    textInput: FieldTextInputTheme;
};

export const defaultTextInputTheme: ThemeFactory<"textInput"> = ({
    theme,
}) => ({
    textInput: theme.field.text,
});
