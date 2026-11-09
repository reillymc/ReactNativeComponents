import { Children, type FunctionComponent, type ReactNode } from "react";
import { View, type ViewStyle } from "react-native";

import { ContextContainerSwipeable } from "./ContextContainerSwipeable";

export interface ContextContainerProps {
    /**
     * Supports:
     * - `ContextAction`
     */
    actions?: Array<ReactNode>;
    style?: ViewStyle;
    children?: ReactNode;
    onSwipeInteractionChange?: (active: boolean) => void;
}

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const ContextContainer: FunctionComponent<ContextContainerProps> = ({
    actions = EMPTY_ACTIONS,
    style,
    children,
    onSwipeInteractionChange,
}) => {
    const resolvedActions = Children.toArray(actions);

    if (resolvedActions.length === 0) {
        return <View style={style}>{children}</View>;
    }

    return (
        <ContextContainerSwipeable
            actions={resolvedActions}
            containerStyle={style}
            onSwipeInteractionChange={onSwipeInteractionChange}
        >
            {children}
        </ContextContainerSwipeable>
    );
};
