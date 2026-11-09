import { Children, type FunctionComponent, type ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";

import { ContextActionContext } from "../../actions/contextAction/ContextActionContext";
import type { ContextContainerProps } from "./ContextContainer";
import { ContextMenu } from "./ContextMenu.web";
import { useContextMenuTrigger } from "./useContextMenuTrigger.web";

const EMPTY_ACTIONS: Array<ReactNode> = [];

export const ContextContainer: FunctionComponent<ContextContainerProps> = ({
    actions = EMPTY_ACTIONS,
    style,
    children,
    onSwipeInteractionChange,
}) => {
    const resolvedActions = Children.toArray(actions);
    const { containerRef, menuAnchor, handleDismiss } = useContextMenuTrigger({
        hasActions: resolvedActions.length > 0,
    });

    if (resolvedActions.length === 0) {
        return <View style={style}>{children}</View>;
    }

    return (
        <>
            <View ref={containerRef}>
                <Swipeable
                    renderRightActions={(
                        _progress,
                        _translation,
                        swipeableMethods,
                    ) => (
                        <ContextActionContext.Provider
                            value={{
                                layout: "swipe",
                                onActionActivated: () =>
                                    swipeableMethods.close(),
                            }}
                        >
                            <View style={styles.actionsContainer}>
                                {resolvedActions}
                            </View>
                        </ContextActionContext.Provider>
                    )}
                    enableTrackpadTwoFingerGesture
                    friction={1.5}
                    overshootRight={false}
                    containerStyle={[style, styles.overflowVisible]}
                    onSwipeableOpenStartDrag={() =>
                        onSwipeInteractionChange?.(true)
                    }
                    onSwipeableClose={() => onSwipeInteractionChange?.(false)}
                >
                    {children}
                </Swipeable>
            </View>
            {menuAnchor && (
                <ContextMenu
                    anchor={menuAnchor}
                    actions={resolvedActions}
                    initialActive={menuAnchor.openedWithKeyboard}
                    onDismiss={handleDismiss}
                />
            )}
        </>
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
