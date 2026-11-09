import type { AnchoredContainerTheme } from "../../../overlays/anchoredContainer/AnchoredContainer";
import type { MenuTheme } from "../../../overlays/menu/Menu";
import type { MenuItemTheme } from "../../../overlays/menu/MenuItem";
import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTextInputTheme, FieldTheme } from "../../field";

export interface ComboboxInputTheme {
    panel: AnchoredContainerTheme;
    surface: FieldTheme["surface"];
    input: FieldTextInputTheme;
    menu: MenuTheme;
    option: MenuItemTheme;
}

export const defaultComboboxInputTheme: ThemeFactory<"comboboxInput"> = ({
    theme,
}) => ({
    panel: theme.anchoredContainer,
    surface: theme.field.surface,
    input: theme.field.text,
    menu: theme.menu,
    option: theme.menuItem,
});
