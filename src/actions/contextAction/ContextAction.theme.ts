import type { ThemeFactory } from "../../theme/theme";

export const defaultContextActionTheme: ThemeFactory<"contextAction"> = ({
    palette,
    theme,
}) => {
    const destructiveColor =
        theme.iconButton.appearance.subtle.content.destructive;

    return {
        swipe: {
            width: 72,
            borderRadius: palette.border.radius.loose,
            gap: palette.spacing.tiny,
            button: theme.iconButton,
        },
        menu: {
            item: {
                primary: {},
                destructive: {
                    label: {
                        text: {
                            color: destructiveColor,
                        },
                    },
                    icon: {
                        color: destructiveColor,
                    },
                },
            },
        },
    };
};
