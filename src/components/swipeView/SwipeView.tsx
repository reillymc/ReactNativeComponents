import { type FunctionComponent, type ReactNode, useMemo, useRef } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable, {
    type SwipeableRef,
} from "react-native-gesture-handler/ReanimatedSwipeable";

export interface SwipeViewProps {
    /**
     * Supports:
     * - `SwipeAction`
     */
    rightActions?: Array<ReactNode>;
    containerStyle?: ViewStyle;
    children?: ReactNode;
}

export const SwipeView: FunctionComponent<SwipeViewProps> = ({
    rightActions = [],
    containerStyle,
    children,
}) => {
    // biome-ignore lint/suspicious/noExplicitAny: ref types behaving weird in react 19. TODO: remove any
    const swipeableRef = useRef<SwipeableRef>(null) as any;
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
            hitSlop={{ left: -80 }}
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
