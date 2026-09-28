import type React from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

export interface PanelProps {
    collapsed: boolean | undefined;
    style?: StyleProp<ViewStyle>;
    header?: React.ReactNode;
    children?: React.ReactNode;
}

const LAYOUT_TRANSITION = LinearTransition.easing(Easing.inOut(Easing.cubic))
    .mass(0.3)
    .springify();

export const Panel: React.FunctionComponent<PanelProps> = ({
    collapsed,
    style,
    header,
    children,
}) => (
    <Animated.View layout={LAYOUT_TRANSITION} style={style}>
        {header}
        <Animated.View
            layout={LAYOUT_TRANSITION}
            style={[styles.collapsible, collapsed && styles.collapsed]}
        >
            {children}
        </Animated.View>
    </Animated.View>
);

const styles = StyleSheet.create({
    collapsible: {
        overflow: "hidden",
    },
    collapsed: {
        height: 0,
    },
});
