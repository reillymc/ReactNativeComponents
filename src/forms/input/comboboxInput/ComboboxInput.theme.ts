import type { MenuTheme } from "../../../overlays/menu/Menu";
import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../../field";

export interface ComboboxInputTheme {
    panelGap: number;
    surface: FieldTheme["surface"];
    textInput: FieldTextInputTheme;
    menu: MenuTheme;
}

export const defaultComboboxInputTheme: ThemeFactory<"comboboxInput"> = ({
    palette,
    theme,
}) => ({
    panelGap: palette.spacing.tiny,
    surface: theme.field.surface,
    textInput: theme.field.text,
    menu: theme.menu,
});
