import type { ThemeFactory } from "../../theme/theme";

export const defaultInputScaffoldTheme: ThemeFactory<"inputScaffold"> = ({
    palette,
    theme,
}) => ({
    gap: palette.spacing.tiny,
    inputPadding: theme.inputBase.container.padding,
    errorColor: palette.color.destructive,
    mandatoryIndicator: {
        color: palette.color.primary,
    },
    helpText: {
        gap: palette.spacing.tiny,
    },
});
