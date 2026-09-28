import { type FunctionComponent, type ReactNode, useRef } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable, {
    type SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

export interface SwipeableContainerProps {
    /**
     * Supports:
     * - `SwipeAction`
     */
    rightActions?: Array<ReactNode>;
    containerStyle?: ViewStyle;
    children?: ReactNode;
}

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const SwipeableContainer: FunctionComponent<SwipeableContainerProps> = ({
    rightActions = EMPTY_ACTIONS,
    containerStyle,
    children,
}) => {
    const swipeableRef = useRef<SwipeableMethods>(null);
    const actions = [...rightActions].reverse();

    const close = () => {
        swipeableRef.current?.close();
    };

    const renderRightActions = () => (
        <View style={styles.actionsContainer}>
            {actions.map((action, index) => (
                <View
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                    key={index}
                    onTouchEnd={close}
                >
                    {action}
                </View>
            ))}
        </View>
    );

    if (actions.length === 0) {
        return <View style={containerStyle}>{children}</View>;
    }

    return (
        <Swipeable
            hitSlop={{ left: -20, right: -20 }}
            ref={swipeableRef}
            renderRightActions={renderRightActions}
            enableTrackpadTwoFingerGesture
            friction={1.5}
            overshootRight={false}
            containerStyle={containerStyle}
        >
            {children}
        </Swipeable>
    );
};

const styles = StyleSheet.create({
    actionsContainer: {
        display: "flex",
        flexDirection: "row",
    },
});
