import type { ThemeFactory } from "../../theme/theme";

export const defaultSelectionInputTheme: ThemeFactory<"selectionInput"> = ({
    palette,
    theme,
}) => ({
    container: {
        height: theme.inputBase.container.height,
        padding: theme.inputBase.container.padding,
        borderRadius: theme.inputBase.container.borderRadius,
        backgroundColor: theme.inputBase.container.backgroundColor,
    },
    selectionContainer: {
        gap: palette.spacing.tiny,
    },
    text: {
        color: theme.inputBase.text.color,
        placeholderColor: theme.inputBase.text.placeholderColor,
    },
    icon: {
        color: theme.inputAction.color,
    },
});
