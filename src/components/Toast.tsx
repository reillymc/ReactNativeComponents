import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout, SlideInDown, SlideOutDown } from "react-native-reanimated";

import { ThemedStyles, useThemedStyles } from "../hooks";

export interface ToastProps {
    action?: React.ReactNode;
    children?: React.ReactNode;
}

export const Toast: React.FunctionComponent<ToastProps> = ({ action, children }) => {
    const styles = useThemedStyles(createStyles, {});

    return (
        <Animated.View
            style={styles.container}
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

const createStyles = ({ theme: { color, padding, border } }: ThemedStyles) =>
    StyleSheet.create({
        container: {
            position: "absolute",
            bottom: 100,
            left: padding.pageHorizontal + padding.regular,
            right: padding.pageHorizontal + padding.regular,
            backgroundColor: color.backgroundHighlight,
            padding: padding.regular,
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
            marginHorizontal: padding.regular,
        },
    });
