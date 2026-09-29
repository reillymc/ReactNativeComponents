import type { FunctionComponent, ReactNode } from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import Animated, {
    LinearTransition,
    SlideInDown,
    SlideOutDown,
} from "react-native-reanimated";

import { type ThemedStyles, useThemedStyles } from "../../hooks";

export interface ToastStyles {
    container: {
        backgroundColor: ColorValue;
        padding: number;
        borderRadius: number;
    };
}
export interface ToastProps {
    action?: ReactNode;
    containerStyle?: StyleProp<ViewStyle>;
    children?: ReactNode;
}

const TOAST_ENTERING = SlideInDown.springify().mass(0.5);
const TOAST_EXITING = SlideOutDown.springify().mass(0.5);
const TOAST_LAYOUT = LinearTransition.springify().mass(0.5);

export const Toast: FunctionComponent<ToastProps> = ({
    action,
    containerStyle,
    children,
}) => {
    const [styles] = useThemedStyles("toast", createStyles);

    return (
        <Animated.View
            style={[styles.container, containerStyle]}
            entering={TOAST_ENTERING}
            exiting={TOAST_EXITING}
            layout={TOAST_LAYOUT}
        >
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>{children}</View>
                {action && (
                    <View style={styles.actionContainer}>
                        <Animated.View
                            layout={TOAST_LAYOUT}
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
    theme: { color, spacing },
    styles: { toast },
}: ThemedStyles) =>
    StyleSheet.create({
        container: {
            backgroundColor: toast.container.backgroundColor,
            padding: toast.container.padding,
            borderRadius: toast.container.borderRadius,
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
            borderStartWidth: StyleSheet.hairlineWidth,
            borderStartColor: color.textSecondary,
            height: "100%",
            marginHorizontal: spacing.medium,
        },
    });
