import { type FC, type ReactNode, useEffect, useState } from "react";
import { View } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { SwipeActionContext } from "../../actions/swipeAction/SwipeActionContext";
import { defineStyles, useComponent } from "../../internal";

export type SwipeActionState = "closed" | "opening" | "open" | "closing";

export interface SwipeActionContainerRenderState {
    swipeState: SwipeActionState;
}

export interface SwipeActionContainerTheme {
    margin: number;
    gap: number;
}

export interface SwipeActionContainerProps {
    actions: ReadonlyArray<ReactNode>;
    theme?: DeepPartial<SwipeActionContainerTheme>;
    children:
        | ReactNode
        | ((state: SwipeActionContainerRenderState) => ReactNode);
    onSwipeStateChange?: (state: SwipeActionState) => void;
}

export const SwipeActionContainer: FC<SwipeActionContainerProps> = ({
    actions,
    children,
    onSwipeStateChange,
    theme: themeOverrides,
}) => {
    const [swipeState, setSwipeState] = useState<SwipeActionState>("closed");
    const { styles } = useComponent("swipeActionContainer", {
        themeOverrides,
        createStyles,
    });

    const hasActions = actions.length > 0;

    useEffect(() => {
        if (!hasActions) {
            setSwipeState("closed");
        }
    }, [hasActions]);

    const resolvedSwipeState = hasActions ? swipeState : "closed";
    const content =
        typeof children === "function"
            ? children({ swipeState: resolvedSwipeState })
            : children;

    if (!hasActions) {
        return <>{content}</>;
    }

    const handleSwipeStateChange = (state: SwipeActionState) => {
        setSwipeState(state);
        onSwipeStateChange?.(state);
    };

    return (
        <Swipeable
            renderRightActions={(_progress, _translation, swipeableMethods) => (
                <SwipeActionContext.Provider
                    value={{
                        onActionActivated: () => swipeableMethods.close(),
                    }}
                >
                    <View style={styles.actionsContainer}>{actions}</View>
                </SwipeActionContext.Provider>
            )}
            enableTrackpadTwoFingerGesture
            friction={1.5}
            // Prevent gesture interfering with swipe from left to go back on iOS
            hitSlop={{ left: -20 }}
            overshootRight={false}
            containerStyle={styles.overflowVisible}
            onSwipeableOpenStartDrag={() => handleSwipeStateChange("opening")}
            onSwipeableWillOpen={() => handleSwipeStateChange("opening")}
            onSwipeableOpen={() => handleSwipeStateChange("open")}
            onSwipeableCloseStartDrag={() => handleSwipeStateChange("closing")}
            onSwipeableWillClose={() => handleSwipeStateChange("closing")}
            onSwipeableClose={() => handleSwipeStateChange("closed")}
        >
            {content}
        </Swipeable>
    );
};

const createStyles = defineStyles((theme: SwipeActionContainerTheme) => ({
    actionsContainer: {
        margin: theme.margin,
        gap: theme.gap,
        display: "flex",
        flexDirection: "row-reverse",
    },
    overflowVisible: {
        overflow: "visible",
    },
}));
