import type { StyleFactory } from "../../style/styleFactory";
import { defaultInputBaseStyles } from "../input/InputBase.styles";
import { defaultMenuStyles } from "./Menu.styles";

export type MenuItemStyles = {
    paddingHorizontal: number;
    paddingVertical: number;
    borderRadius: number;
};

export const defaultMenuItemStyles: StyleFactory<MenuItemStyles> = (theme) => {
    const inputBase = defaultInputBaseStyles(theme);
    const menu = defaultMenuStyles(theme);

    return {
        paddingHorizontal: inputBase.container.padding - menu.padding,
        paddingVertical: theme.spacing.small + theme.spacing.tiny,
        borderRadius: menu.borderRadius / 2,
    };
};
