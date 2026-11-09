import { Children, type FunctionComponent, type ReactNode } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ContextActionContext } from "../../actions/contextAction/ContextActionContext";

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
        <Swipeable
            renderRightActions={(_progress, _translation, swipeableMethods) => (
                <ContextActionContext.Provider
                    value={{
                        layout: "swipe",
                        onActionActivated: () => swipeableMethods.close(),
                    }}
                >
                    <View style={styles.actionsContainer}>
                        {resolvedActions}
                    </View>
                </ContextActionContext.Provider>
            )}
            enableTrackpadTwoFingerGesture
            friction={1.5}
            overshootRight={false}
            containerStyle={[style, styles.overflowVisible]}
            onSwipeableOpenStartDrag={() => onSwipeInteractionChange?.(true)}
            onSwipeableClose={() => onSwipeInteractionChange?.(false)}
        >
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    actionsContainer: {
        display: "flex",
        flexDirection: "row-reverse",
        gap: 8,
        marginLeft: 8,
    },
    overflowVisible: {
        overflow: "visible",
    },
});
