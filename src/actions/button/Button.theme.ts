import type { ThemeFactory } from "../../theme/theme";

export const defaultButtonTheme: ThemeFactory<"button"> = ({
    palette,
    theme,
}) => {
    const { color } = palette;

    return {
        container: {
            borderRadius: theme.buttonBase.borderRadius,
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
