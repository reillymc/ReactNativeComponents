import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";

import { ThemedStyles, useThemedStyles } from "../hooks";

import { Text } from "./Text";
import { useStatusBarHeight } from "./StatusBarBlur";

const headerStartPos = 0;

export type NavigationHeaderStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
    fontSize: number;
    paddingTop: number;
    paddingBottom: number;
    paddingLeft: number;
    paddingRight: number;
};

export interface NavigationHeaderProps {
    heading: string;

    /**
     * Allows the heading text to fade in dynamically based on scroll position.
     * If not provided, the heading text will always be shown.
     */
    scrollPosition?: number;

    /**
     * Supports:
     * - `<Action/>`
     */
    leftItem?: React.ReactNode;

    /**
     * Supports:
     * - `<Action/>`
     */
    rightItem?: React.ReactNode;

    style?: StyleProp<ViewStyle>;
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    heading,
    scrollPosition = 100,
    leftItem,
    rightItem,
    style,
}) => {
    const [headerHeight, setHeaderHeight] = React.useState(0);
    const ref = React.useRef<View>(null);
    const statusBarHeight = useStatusBarHeight();
    const styles = useThemedStyles(createStyles, { scrollPosition, statusBarHeight, headerHeight });
    const colorScheme = useColorScheme();

    React.useEffect(() => {
        ref.current?.measure((_x, _y, _width, height) => {
            setHeaderHeight(height);
        });
    });

    const intensity = Math.min(scrollPosition * 2, 85);

    return (
        <BlurView
            ref={ref}
            intensity={intensity}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={[styles.headerContainer, style]}
        >
            <View style={styles.headerItemLeft}>{leftItem}</View>
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.headerItemRight}>{rightItem}</View>
        </BlurView>
    );
};

NavigationHeader.displayName = "NavigationHeader";

const createStyles = (
    { styles: { navigationHeader }, theme: { color } }: ThemedStyles,
    {
        scrollPosition = 100,
        statusBarHeight,
        headerHeight,
    }: Partial<NavigationHeaderProps> & { statusBarHeight: number; headerHeight: number },
) => {
    const offset = scrollPosition - headerStartPos - statusBarHeight;
    const styles = StyleSheet.create({
        headerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: navigationHeader.paddingTop + statusBarHeight,
            paddingBottom: navigationHeader.paddingBottom,
            paddingLeft: navigationHeader.paddingLeft,
            paddingRight: navigationHeader.paddingRight,
            shadowColor: color.shadow,
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: Math.min(offset * 0.2, 5),
            },
        },
        headerItemLeft: {
            flex: 1,
        },
        headerItemRight: {
            flex: 1,
            alignItems: "flex-end",
        },
        heading: {
            fontFamily: navigationHeader.fontFamilyWeight,
            fontSize: navigationHeader.fontSize,
            opacity: (scrollPosition - statusBarHeight) / 30,
        },
    });
    return styles;
};
