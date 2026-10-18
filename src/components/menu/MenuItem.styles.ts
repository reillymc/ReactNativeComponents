import type { Theme } from "../../theme/theme";
import { defaultInputBaseStyles } from "../input/InputBase.styles";
import { defaultMenuStyles } from "./Menu.styles";
import type { MenuItemStyles } from "./MenuItem";

export const defaultMenuItemStyles = (theme: Theme): MenuItemStyles => {
    const inputBase = defaultInputBaseStyles(theme);
    const menu = defaultMenuStyles(theme);

    return {
        paddingHorizontal: inputBase.container.padding - menu.padding,
        paddingVertical: theme.spacing.small + theme.spacing.tiny,
        borderRadius: menu.borderRadius / 2,
    };
};
