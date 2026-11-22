import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface ContextMenuAction {
    /** Stable key used when rendering the action in menus. */
    key: string;
    label: string;
    description?: string;
    disabled?: boolean;
}

export type ContextMenuPosition = {
    x: number;
    y: number;
};

export interface ContextMenuProps<
    A extends ContextMenuAction = ContextMenuAction,
> {
    actions: ReadonlyArray<A>;
    onActionPress?: (action: A) => void;
    renderItem?: (action: A) => ReactNode;
    style?: StyleProp<ViewStyle>;
    /**
     * Tab index for the trigger wrapper. Set to `0` when
     * the wrapper itself should be keyboard focusable.
     */
    tabIndex?: 0 | -1;
    children: ReactNode;
}

export const ContextMenu = <A extends ContextMenuAction = ContextMenuAction>({
    children,
}: ContextMenuProps<A>) => children;
