import { Children, type FunctionComponent, type ReactNode } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";

import {
    ContextContainerSwipeable,
    type ContextSwipeState,
} from "./ContextContainerSwipeable";

export interface ContextContainerProps {
    /**
     * Supports:
     * - `ContextAction`
     */
    actions?: Array<ReactNode>;
    style?: ViewStyle;
    actionsContainerStyle?: StyleProp<ViewStyle>;
    children?: ReactNode;
    onSwipeStateChange?: (state: ContextSwipeState) => void;
}

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const ContextContainer: FunctionComponent<ContextContainerProps> = ({
    actions = EMPTY_ACTIONS,
    children,
    ...props
}) => {
    const resolvedActions = Children.toArray(actions);

    if (resolvedActions.length === 0) {
        return <View style={props.style}>{children}</View>;
    }

    return (
        <ContextContainerSwipeable {...props} actions={resolvedActions}>
            {children}
        </ContextContainerSwipeable>
    );
};
