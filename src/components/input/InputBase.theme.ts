import type { ThemeFactory } from "../../theme/theme";
import { createDefaultFocusRing } from "../shared/focusRing";

export const defaultInputBaseTheme: ThemeFactory<"inputBase"> = ({
    palette,
}) => {
    const { border, color, font, spacing } = palette;

    return {
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
        focusRing: createDefaultFocusRing(palette),
    };
};
