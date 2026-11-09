import type { FunctionComponent, ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ContextActionContext } from "../../actions/contextAction/ContextActionContext";

export type ContextSwipeState = "closed" | "opening" | "open" | "closing";

export interface ContextContainerSwipeableProps {
    actions: Array<ReactNode>;
    containerStyle?: StyleProp<ViewStyle>;
    actionsContainerStyle?: StyleProp<ViewStyle>;
    children?: ReactNode;
    onSwipeStateChange?: (state: ContextSwipeState) => void;
}

export const ContextContainerSwipeable: FunctionComponent<
    ContextContainerSwipeableProps
> = ({
    actions,
    containerStyle,
    actionsContainerStyle,
    children,
    onSwipeStateChange,
}) => (
    <Swipeable
        renderRightActions={(_progress, _translation, swipeableMethods) => (
            <ContextActionContext.Provider
                value={{
                    layout: "swipe",
                    onActionActivated: () => swipeableMethods.close(),
                }}
            >
                <View style={[styles.actionsContainer, actionsContainerStyle]}>
                    {actions}
                </View>
            </ContextActionContext.Provider>
        )}
        enableTrackpadTwoFingerGesture
        friction={1.5}
        overshootRight={false}
        containerStyle={[containerStyle, styles.overflowVisible]}
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
        gap: 8,
        marginLeft: 8,
    },
    overflowVisible: {
        overflow: "visible",
    },
});
