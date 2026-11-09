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
        gap: palette.spacing.small,
        lineHeight: {
            label: Math.ceil(
                textTheme.text.font.body.size * palette.font.lineHeightScale,
            ),
            description: Math.ceil(
                textTheme.text.font.caption.size * palette.font.lineHeightScale,
            ),
        },
        label: textTheme,
        description: textTheme,
        icon: {
            size: theme.iconBase.size,
            color: theme.menu.textColor,
        },
    };
};
