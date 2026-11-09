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
    style,
    actionsContainerStyle,
    children,
    onSwipeStateChange,
}) => {
    const resolvedActions = Children.toArray(actions);

    if (resolvedActions.length === 0) {
        return <View style={style}>{children}</View>;
    }

    return (
        <ContextContainerSwipeable
            actions={resolvedActions}
            containerStyle={style}
            actionsContainerStyle={actionsContainerStyle}
            onSwipeStateChange={onSwipeStateChange}
        >
            {children}
        </ContextContainerSwipeable>
    );
};
