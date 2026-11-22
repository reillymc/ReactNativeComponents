import { useContext } from "react";

import type { IconComponentProps } from "../../icons/IconComponentProps";
import { MenuItem, type MenuItemProps } from "../menu";
import { ContextMenuItemContext } from "./ContextMenuItemContext";

export interface ContextMenuItemProps
    extends Omit<
        MenuItemProps,
        "highlighted" | "role" | "tabIndex" | "onPress"
    > {}

export const ContextMenuItem = <G extends string>({
    label,
    accessibilityLabel,
    ...props
}: ContextMenuItemProps & Partial<IconComponentProps<G>>) => {
    const context = useContext(ContextMenuItemContext);

    return (
        <MenuItem
            {...props}
            label={label}
            accessibilityLabel={accessibilityLabel ?? label}
            highlighted={context.active}
            role="menuitem"
            tabIndex={-1}
            onPress={context.onActionActivated}
        />
    );
};

ContextMenuItem.displayName = "ContextMenuItem";
