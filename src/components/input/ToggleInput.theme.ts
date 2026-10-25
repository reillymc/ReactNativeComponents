import type { ThemeFactory } from "../../theme/theme";

export const defaultToggleInputTheme: ThemeFactory<"toggleInput"> = ({
    palette,
    theme,
}) => {
    const { color, spacing } = palette;

    return {
        indicator: {
            size: {
                compact: theme.iconBase.size * 0.8,
                regular: theme.iconBase.size,
            },
            color: {
                selected: theme.action.label.color,
                deselected: {
                    enabled: color.border,
                    disabled: color.muted,
                },
            },
        },
        label: {
            gap: spacing.small,
        },
        disabledLabelColor: theme.inputBase.text.color.disabled,
        helpTextGap: theme.inputScaffold.gap,
    };
};
