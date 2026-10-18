import type { Theme } from "../../theme/theme";
import type { ButtonBaseStyles } from "./ButtonBase";

export const defaultButtonBaseStyles = ({
    border,
    color,
    spacing,
}: Theme): ButtonBaseStyles => ({
    height: 42,
    width: {
        medium: "50%",
    },
    borderRadius: border.radius.regular,
    paddingHorizontal: spacing.medium,
    paddingVertical: spacing.small,
    backgroundColor: color.primary,
});
