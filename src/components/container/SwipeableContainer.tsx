import { type FunctionComponent, type ReactNode, useMemo, useRef } from "react";
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

export const SwipeableContainer: FunctionComponent<SwipeableContainerProps> = ({
    rightActions = [],
    containerStyle,
    children,
}) => {
    const swipeableRef = useRef<SwipeableMethods>(null);
    const actions = useMemo(() => rightActions.reverse(), [rightActions]);

    const handleActionsPress = () => {
        swipeableRef.current?.close();
    };

    const renderRightActions = () => {
        return (
            <View
                style={styles.actionsContainer}
                onTouchEnd={handleActionsPress}
            >
                {actions}
            </View>
        );
    };

    return (
        <Swipeable
            hitSlop={{ left: -20 }}
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
