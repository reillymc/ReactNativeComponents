import type React from "react";
import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
    LinearTransition,
    SlideInDown,
    SlideOutDown,
} from "react-native-reanimated";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export interface ToastStyles {
    horizontalInset: number;
    bottomInset: number;
}
export interface ToastProps {
    action?: React.ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const Toast: React.FunctionComponent<ToastProps> = ({
    action,
    containerStyle,
    children,
}) => {
    const [styles] = useThemedStyles("toast", createStyles);

    return (
        <Animated.View
            style={[styles.container, containerStyle]}
            entering={SlideInDown.springify().mass(0.5)}
            exiting={SlideOutDown.springify().mass(0.5)}
            layout={LinearTransition.springify().mass(0.5)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>{children}</View>
                {action && (
                    <View style={styles.actionContainer}>
                        <Animated.View
                            layout={LinearTransition.springify().mass(0.5)}
                            style={styles.separator}
                        />
                        {action}
                    </View>
                )}
            </View>
        </Animated.View>
    );
};

const createStyles = ({
    theme: { color, spacing, border },
    styles: { toast },
}: ThemedStyles) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            bottom: toast.bottomInset,
            left: toast.horizontalInset,
            right: toast.horizontalInset,
            backgroundColor: color.backgroundHighlight,
            padding: spacing.medium,
            borderRadius: border.radius.loose,
        },
        innerContainer: {
            flexDirection: "row",
            justifyContent: "space-between",
        },
        contentContainer: {
            flex: 1,
        },
        actionContainer: {
            flex: 0,
            alignItems: "center",
            flexDirection: "row",
            height: "100%",
        },
        separator: {
            borderLeftWidth: StyleSheet.hairlineWidth,
            borderLeftColor: color.textSecondary,
            height: "100%",
            marginHorizontal: spacing.medium,
        },
    });
