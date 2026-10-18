import type { Theme } from "../../theme/theme";
import { defaultInputBaseStyles } from "../input/InputBase.styles";
import type { MenuStyles } from "./Menu";

export const defaultMenuStyles = (theme: Theme): MenuStyles => {
    const inputBase = defaultInputBaseStyles(theme);

    return {
        backgroundColor: theme.color.elevated,
        borderRadius: inputBase.container.borderRadius,
        gap: theme.spacing.tiny,
        padding: theme.spacing.tiny,
        parentMargin: theme.spacing.medium,
    };
};
