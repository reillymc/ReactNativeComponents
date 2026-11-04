import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../../field";

export type CounterInputTheme = {
    surface: FieldTheme["surface"];
    input: FieldTextInputTheme;
};

export const defaultCounterInputTheme: ThemeFactory<"counterInput"> = ({
    theme,
}) => ({
    surface: { ...theme.field.surface, padding: 0 },
    input: theme.field.text,
});
