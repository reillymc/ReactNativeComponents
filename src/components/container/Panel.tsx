import type { FunctionComponent, ReactNode } from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";

export interface PanelProps {
    collapsed: boolean | undefined;
    style?: StyleProp<ViewStyle>;
    header?: ReactNode;
    children?: ReactNode;
}

const LAYOUT_TRANSITION = LinearTransition.easing(Easing.inOut(Easing.cubic))
    .mass(0.3)
    .springify();

export const Panel: FunctionComponent<PanelProps> = ({
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
