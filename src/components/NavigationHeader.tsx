import React from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { BlurView } from "expo-blur";

import { ThemedStyles, useThemedStyles } from "../hooks";
import { Text } from "./Text";

const headerStartPos = 40;

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
     * Allows the heading text to fade in dynamically based on scroll position. If not provided, the heading text will always be shown.
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
    const styles = useThemedStyles(createStyles, { scrollPosition });

    return (
        <BlurView intensity={100} tint="default" style={[styles.headerContainer, style]}>
            <View style={styles.headerItemLeft}>{leftItem}</View>
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.headerItemRight}>{rightItem}</View>
        </BlurView>
    );
};

NavigationHeader.displayName = "NavigationHeader";

const createStyles = (
    { styles: { navigationHeader } }: ThemedStyles,
    { scrollPosition = 100 }: Partial<NavigationHeaderProps>,
) =>
    StyleSheet.create({
        headerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: navigationHeader.paddingTop,
            paddingBottom: navigationHeader.paddingBottom,
            paddingLeft: navigationHeader.paddingLeft,
            paddingRight: navigationHeader.paddingRight,
            shadowColor: "#555",
            shadowOpacity: 0.2,
            shadowRadius: 5,
            shadowOffset: {
                width: 0,
                height: Math.min((scrollPosition - headerStartPos) * 0.2, 5),
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
            opacity: (scrollPosition - headerStartPos) / 30,
        },
    });
