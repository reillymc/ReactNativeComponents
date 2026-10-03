import type { Theme } from "../../theme/theme";
import { defaultIconBaseStyles } from "../icon/IconBase.styles";
import type { IconButtonBaseStyles } from "./IconButtonBase";

export const defaultIconButtonBaseStyles = (
    theme: Theme,
): IconButtonBaseStyles => ({
    container: {
        padding: 4,
        size: 48,
        backgroundColor: theme.color.inset,
        borderRadius: "50%",
    },
    icon: {
        size: defaultIconBaseStyles(theme).size,
        color: theme.color.foreground,
    },
});
