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
}

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const SwipeableContainer: FunctionComponent<SwipeableContainerProps> = ({
    rightActions = EMPTY_ACTIONS,
    style,
    children,
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
            containerStyle={style}
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
});
