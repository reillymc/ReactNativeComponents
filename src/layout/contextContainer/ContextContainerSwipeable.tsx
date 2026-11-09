import type { FunctionComponent, ReactNode } from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ContextActionContext } from "../../actions/contextAction/ContextActionContext";

export interface ContextContainerSwipeableProps {
    actions: Array<ReactNode>;
    containerStyle?: StyleProp<ViewStyle>;
    children?: ReactNode;
    onSwipeInteractionChange?: (active: boolean) => void;
}

export const ContextContainerSwipeable: FunctionComponent<
    ContextContainerSwipeableProps
> = ({ actions, containerStyle, children, onSwipeInteractionChange }) => (
    <Swipeable
        renderRightActions={(_progress, _translation, swipeableMethods) => (
            <ContextActionContext.Provider
                value={{
                    layout: "swipe",
                    onActionActivated: () => swipeableMethods.close(),
                }}
            >
                <View style={styles.actionsContainer}>{actions}</View>
            </ContextActionContext.Provider>
        )}
        enableTrackpadTwoFingerGesture
        friction={1.5}
        overshootRight={false}
        containerStyle={[containerStyle, styles.overflowVisible]}
        onSwipeableOpenStartDrag={() => onSwipeInteractionChange?.(true)}
        onSwipeableClose={() => onSwipeInteractionChange?.(false)}
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
