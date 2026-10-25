import type { ThemeFactory } from "../../../theme/theme";

export const defaultDropdownInputTheme: ThemeFactory<"dropdownInput"> = ({
    palette,
}) => ({
    panelGap: palette.spacing.tiny,
});
