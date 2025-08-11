import type React from "react";
import { type StyleProp, StyleSheet, type ViewStyle } from "react-native";
import Animated, { Easing, Layout } from "react-native-reanimated";

export interface PanelProps {
    collapsed: boolean | undefined;
    style?: StyleProp<ViewStyle>;
    header?: React.ReactNode;
    children?: React.ReactNode;
}

export const Panel: React.FunctionComponent<PanelProps> = ({
    collapsed,
    style,
    header,
    children,
}) => {
    const styles = createStyles({ collapsed });

    return (
        <Animated.View
            layout={Layout.easing(Easing.inOut(Easing.cubic))
                .mass(0.3)
                .springify()}
            style={style}
        >
            {header}
            <Animated.View
                layout={Layout.easing(Easing.inOut(Easing.cubic))
                    .mass(0.3)
                    .springify()}
                style={styles.collapsible}
            >
                {children}
            </Animated.View>
        </Animated.View>
    );
};

const createStyles = ({ collapsed }: PanelProps) => {
    const styles = StyleSheet.create({
        collapsible: {
            overflow: "hidden",
            height: collapsed ? 0 : undefined,
        },
    });
    return styles;
};
