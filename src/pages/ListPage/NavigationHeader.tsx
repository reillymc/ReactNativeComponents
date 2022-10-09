import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

interface NavigationHeaderProps {
    heading: string;
    scrollPosition: number;
    leftItem?: React.ReactNode;
    rightItem?: React.ReactNode;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({ heading, scrollPosition, leftItem, rightItem }) => {
    const height = Math.min((scrollPosition - 50) * 0.2, 5);

    return (
        <BlurView
            intensity={100}
            tint="light"
            style={[
                styles.headerContainer,
                {
                    shadowOffset: {
                        width: 0,
                        height: height,
                    },
                },
            ]}
        >
            <View style={styles.headerItemLeft}>{leftItem}</View>
            <Text style={[styles.heading, { opacity: (scrollPosition - 50) / 30 }]}>{heading}</Text>
            <View style={styles.headerItemRight}>{rightItem}</View>
        </BlurView>
    );
};

export { NavigationHeader, NavigationHeaderProps };

const styles = StyleSheet.create({
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
    },
    headerItemLeft: {
        flex: 1,
        marginLeft: 16,
    },
    headerItemRight: {
        flex: 1,
        marginRight: 16,
        alignItems: "flex-end",
    },
    heading: {
        fontFamily: "Comfortaa-Bold",
        fontSize: 20,
    },
});
