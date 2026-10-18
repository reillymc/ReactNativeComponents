import type { Theme } from "../../theme/theme";
import type { InputBaseStyles } from "./InputBase";

export const defaultInputBaseStyles = ({
    border,
    color,
    font,
    spacing,
}: Theme): InputBaseStyles => ({
    container: {
        height: {
            regular: 48,
            compact: 36,
        },
        borderRadius: border.radius.regular,
        padding: spacing.small,
        backgroundColor: {
            enabled: color.inset,
            disabled: color.inset,
        },
    },
    text: {
        fontSize: font.size.regular,
        fontFamily: font.family.sans,
        color: {
            enabled: color.insetForeground,
            disabled: color.insetForeground,
        },
        placeholderColor: color.mutedForeground,
    },
});
