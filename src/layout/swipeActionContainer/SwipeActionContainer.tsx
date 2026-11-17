import type { FC, ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { SwipeActionContext } from "../../actions/swipeAction/SwipeActionContext";

export type SwipeActionState = "closed" | "opening" | "open" | "closing";

export interface SwipeActionContainerProps {
    actions: ReadonlyArray<ReactNode>;
    children: ReactNode;
    actionsContainerStyle?: StyleProp<ViewStyle>;
    onSwipeStateChange?: (state: SwipeActionState) => void;
}

export const SwipeActionContainer: FC<SwipeActionContainerProps> = ({
    actions,
    children,
    actionsContainerStyle,
    onSwipeStateChange,
}) => (
    <Swipeable
        renderRightActions={(_progress, _translation, swipeableMethods) => (
            <SwipeActionContext.Provider
                value={{
                    onActionActivated: () => swipeableMethods.close(),
                }}
            >
                <View style={[styles.actionsContainer, actionsContainerStyle]}>
                    {actions}
                </View>
            </SwipeActionContext.Provider>
        )}
        enableTrackpadTwoFingerGesture
        friction={1.5}
        // Prevent gesture interfering with swipe from left to go back on iOS
        hitSlop={{ left: -20 }}
        overshootRight={false}
        containerStyle={styles.overflowVisible}
        onSwipeableOpenStartDrag={() => onSwipeStateChange?.("opening")}
        onSwipeableWillOpen={() => onSwipeStateChange?.("opening")}
        onSwipeableOpen={() => onSwipeStateChange?.("open")}
        onSwipeableCloseStartDrag={() => onSwipeStateChange?.("closing")}
        onSwipeableWillClose={() => onSwipeStateChange?.("closing")}
        onSwipeableClose={() => onSwipeStateChange?.("closed")}
    >
        {children}
    </Swipeable>
);

const styles = StyleSheet.create({
    actionsContainer: {
        display: "flex",
        flexDirection: "row-reverse",
    },
    overflowVisible: {
        overflow: "visible",
    },
});
