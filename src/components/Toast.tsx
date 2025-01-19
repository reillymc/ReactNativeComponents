import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Animated, { Layout, SlideInDown, SlideOutDown } from "react-native-reanimated";

import { ThemedStyles, useThemedStyles } from "../hooks";

export interface ToastStyles {
    horizontalInset: number;
    bottomInset: number;
}
export interface ToastProps {
    action?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}

export const Toast: React.FunctionComponent<ToastProps> = ({ action, style, children }) => {
    const styles = useThemedStyles(createStyles, {});

    return (
        <Animated.View
            style={[styles.container, style]}
            entering={SlideInDown.springify().mass(0.5)}
            exiting={SlideOutDown.springify().mass(0.5)}
            layout={Layout.springify().mass(0.5)}
        >
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>{children}</View>
                {action && (
                    <>
                        <View style={styles.actionContainer}>
                            <Animated.View layout={Layout.springify().mass(0.5)} style={styles.separator} />
                            {action}
                        </View>
                    </>
                )}
            </View>
        </Animated.View>
    );
};

const createStyles = ({ theme: { color, spacing, border }, styles: { toast } }: ThemedStyles) =>
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
