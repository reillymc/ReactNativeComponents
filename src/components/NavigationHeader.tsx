import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { ThemeContext, useThemedStyles } from "./ThemeProvider";

const headerStartPos = 40;

export type NavigationHeaderStyles = {
    /**
     * Font family due to weight limitations.
     */
    fontFamilyWeight: string;
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
}

export const NavigationHeader: React.FC<NavigationHeaderProps> = ({
    heading,
    scrollPosition = 100,
    leftItem,
    rightItem,
}) => {
    const styles = useThemedStyles(createStyles, { scrollPosition });

    return (
        <BlurView intensity={100} tint="default" style={styles.headerContainer}>
            <View style={styles.headerItemLeft}>{leftItem}</View>
            <Text style={styles.heading}>{heading}</Text>
            <View style={styles.headerItemRight}>{rightItem}</View>
        </BlurView>
    );
};

const createStyles = (
    { styles: { navigationHeader } }: ThemeContext,
    { scrollPosition = 100 }: Partial<NavigationHeaderProps>,
) =>
    StyleSheet.create({
        headerContainer: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: 48,
            paddingBottom: 8,
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
            marginLeft: 20,
        },
        headerItemRight: {
            flex: 1,
            marginRight: 20,
            alignItems: "flex-end",
        },
        heading: {
            fontFamily: navigationHeader.fontFamilyWeight,
            fontSize: 20,
            paddingVertical: 8,
            opacity: (scrollPosition - headerStartPos) / 30,
        },
    });
