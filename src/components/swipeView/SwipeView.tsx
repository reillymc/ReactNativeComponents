import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

export interface SwipeViewProps {
    /**
     * Supports:
     * - `SwipeAction`
     */
    rightActions?: Array<React.ReactNode>;
    containerStyle?: ViewStyle;
    children?: React.ReactNode;
}

export const SwipeView: React.FunctionComponent<SwipeViewProps> = ({ rightActions = [], containerStyle, children }) => {
    const swipeableRef = React.useRef<Swipeable>(null);
    const actions = React.useMemo(() => rightActions.reverse(), [rightActions]);

    const handleActionsPress = () => {
        swipeableRef.current?.close();
    };

    const renderRightActions = () => {
        return (
            <View style={styles.actionsContainer} onTouchEnd={handleActionsPress}>
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
