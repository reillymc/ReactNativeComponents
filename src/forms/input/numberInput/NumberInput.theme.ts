import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../../field";

export type NumberInputTheme = {
    surface: FieldTheme["surface"];
    textInput: FieldTextInputTheme;
};

export const defaultNumberInputTheme: ThemeFactory<"numberInput"> = ({
    theme,
}) => ({
    surface: { ...theme.field.surface, padding: 0 },
    textInput: theme.field.text,
});
