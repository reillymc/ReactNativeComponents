import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import Animated, {
    FadeInDown,
    FadeInLeft,
    FadeInRight,
    FadeInUp,
    FadeOutDown,
    FadeOutLeft,
    FadeOutRight,
    FadeOutUp,
    Layout,
} from "react-native-reanimated";

export interface CollapsibleContainerProps {
    collapsed: boolean | undefined;
    style?: StyleProp<ViewStyle>;
    direction?: "up" | "down" | "left" | "right";
    children?: React.ReactNode;
}

export const CollapsibleContainer: React.FunctionComponent<CollapsibleContainerProps> = ({
    collapsed,
    direction = "down",
    style,
    children,
}) => {
    const styles = createStyles({ collapsed });

    const transitionEntering = {
        up: FadeInUp,
        down: FadeInDown,
        left: FadeInLeft,
        right: FadeInRight,
    }[direction];

    const transitionExiting = {
        up: FadeOutUp,
        down: FadeOutDown,
        left: FadeOutLeft,
        right: FadeOutRight,
    }[direction];

    return (
        <>
            {!collapsed && (
                <Animated.View
                    layout={Layout}
                    style={[styles.collapsible, style]}
                    entering={transitionEntering}
                    exiting={transitionExiting}
                >
                    {children}
                </Animated.View>
            )}
        </>
    );
};

CollapsibleContainer.displayName = "CollapsibleContainer";

const createStyles = ({}: CollapsibleContainerProps) => {
    const styles = StyleSheet.create({
        collapsible: {},
    });
    return styles;
};
