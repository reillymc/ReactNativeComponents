import type { ThemeFactory } from "../../theme/theme";

export const defaultMenuItemTheme: ThemeFactory<"menuItem"> = ({
    palette,
    theme,
}) => {
    const textTheme = {
        ...theme.highlightedText,
        text: {
            ...theme.highlightedText.text,
            color: theme.menu.textColor,
        },
    };

    return {
        paddingHorizontal: theme.field.surface.padding - theme.menu.padding,
        paddingVertical: palette.spacing.small + palette.spacing.tiny,
        borderRadius: palette.border.radius.tight,
        label: textTheme,
        description: textTheme,
    };
};
