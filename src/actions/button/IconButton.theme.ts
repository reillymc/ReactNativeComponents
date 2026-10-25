import type { ThemeFactory } from "../../theme/theme";

export const defaultIconButtonTheme: ThemeFactory<"iconButton"> = ({
    palette,
    theme,
}) => {
    const { color, spacing } = palette;

    return {
        container: {
            size: theme.iconBase.size + spacing.small,
        },
        appearance: {
            prominent: {
                container: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
                content: {
                    primary: color.primaryForeground,
                    destructive: color.destructiveForeground,
                },
            },
            subtle: {
                container: color.inset,
                content: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
            },
        },
    };
};
