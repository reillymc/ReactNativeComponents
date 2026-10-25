import type { ThemeFactory } from "../../theme/theme";

export const defaultButtonBaseTheme: ThemeFactory<"buttonBase"> = ({
    palette: { border, color, spacing },
}) => ({
    height: 42,
    width: {
        medium: "50%",
    },
    borderRadius: border.radius.regular,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: color.primary,
});
