import {
    Children,
    type FunctionComponent,
    type ReactNode,
    useRef,
} from "react";
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
    style?: ViewStyle;
    children?: ReactNode;
    onSwipeInteractionChange?: (active: boolean) => void;
}

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const SwipeableContainer: FunctionComponent<SwipeableContainerProps> = ({
    rightActions = EMPTY_ACTIONS,
    style,
    children,
    onSwipeInteractionChange,
}) => {
    const swipeableRef = useRef<SwipeableMethods>(null);

    const close = () => {
        swipeableRef.current?.close();
    };

    const renderRightActions = () => (
        <View style={styles.actionsContainer}>
            {Children.map(rightActions, (action) => (
                <View onTouchEnd={close}>{action}</View>
            ))}
        </View>
    );

    if (rightActions.length === 0) {
        return <View style={style}>{children}</View>;
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={renderRightActions}
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
