import type { ThemeFactory } from "../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../field";

export type TextInputTheme = {
    surface: FieldTheme["surface"];
    input: FieldTextInputTheme;
};

export const defaultTextInputTheme: ThemeFactory<"textInput"> = ({
    theme,
}) => ({
    surface: theme.field.surface,
    input: theme.field.text,
});
