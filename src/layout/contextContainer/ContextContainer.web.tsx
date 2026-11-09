import { Children, type FunctionComponent, type ReactNode } from "react";
import { View } from "react-native";

import type { ContextContainerProps } from "./ContextContainer";
import { ContextContainerSwipeable } from "./ContextContainerSwipeable";
import { ContextMenu } from "./ContextMenu.web";
import { useContextMenuTrigger } from "./useContextMenuTrigger.web";

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const ContextContainer: FunctionComponent<ContextContainerProps> = ({
    actions = EMPTY_ACTIONS,
    style,
    actionsContainerStyle,
    children,
    onSwipeStateChange,
}) => {
    const resolvedActions = Children.toArray(actions);
    const { containerRef, menuAnchor, handleDismiss } = useContextMenuTrigger({
        hasActions: resolvedActions.length > 0,
    });

    if (resolvedActions.length === 0) {
        return <View style={style}>{children}</View>;
    }

    return (
        <>
            <View ref={containerRef} style={style}>
                <ContextContainerSwipeable
                    actions={resolvedActions}
                    actionsContainerStyle={actionsContainerStyle}
                    onSwipeStateChange={onSwipeStateChange}
                >
                    {children}
                </ContextContainerSwipeable>
            </View>
            {menuAnchor && (
                <ContextMenu
                    anchor={menuAnchor}
                    actions={resolvedActions}
                    initialActive={menuAnchor.openedWithKeyboard}
                    onDismiss={handleDismiss}
                />
            )}
        </>
    );
};
