import React from "react";
import { StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";

import { SwipeViewProps } from ".";

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
