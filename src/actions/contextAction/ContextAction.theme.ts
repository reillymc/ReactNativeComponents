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
            caption: theme.text,
            button: theme.iconButton,
        },
        menu: {
            item: {
                primary: theme.menuItem,
                destructive: {
                    ...theme.menuItem,
                    label: {
                        ...theme.menuItem.label,
                        text: {
                            ...theme.menuItem.label.text,
                            color: destructiveColor,
                        },
                    },
                    icon: {
                        ...theme.menuItem.icon,
                        color: destructiveColor,
                    },
                },
            },
        },
    };
};
