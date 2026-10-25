import type { ThemeFactory } from "../../../theme/theme";

export const defaultComboboxInputTheme: ThemeFactory<"comboboxInput"> = ({
    palette,
}) => ({
    panelGap: palette.spacing.tiny,
});
