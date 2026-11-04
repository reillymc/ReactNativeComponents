import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../../field";

export type TimeInputTheme = {
    unitLabel: {
        paddingStart: number;
    };
    surface: FieldTheme["surface"];
    textInput: FieldTextInputTheme;
};

export const defaultTimeInputTheme: ThemeFactory<"timeInput"> = ({
    palette,
    theme,
}) => ({
    unitLabel: {
        paddingStart: palette.spacing.tiny,
    },
    surface: { ...theme.field.surface, padding: 0 },
    textInput: theme.field.text,
});
