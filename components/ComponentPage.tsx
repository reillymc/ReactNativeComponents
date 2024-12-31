import { ThemedStyles, useTheme, useThemedStyles } from "@reillymc/react-native-components";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export interface ComponentPageProps {
    componentName?: string;
    component: React.ReactNode;
    propsPanel?: React.ReactNode;
    fullscreen?: boolean;
}

export const ComponentPage: React.FunctionComponent<ComponentPageProps> = ({
    component,
    componentName,
    propsPanel,
    fullscreen,
}) => {
    const { theme } = useTheme();

    const styles = useThemedStyles(createStyles, {});

    return (
        <>
            <Stack.Screen
                options={{
                    title: componentName,
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: { fontFamily: theme.font.familyWeight.bold800 },
                    headerBackTitleStyle: { fontFamily: theme.font.familyWeight.regular400 },
                    headerLargeStyle: { backgroundColor: theme.color.background },
                }}
            />
            <View style={[styles.componentContainer, fullscreen ? undefined : styles.centred]}>
                <View style={styles.component}>{component}</View>
            </View>
            <View style={styles.propsContainer}>{propsPanel}</View>
        </>
    );
};

ComponentPage.displayName = "ComponentPage";

const createStyles = ({ theme: { color, border } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        componentContainer: {
            flex: 1,
            backgroundColor: color.background,
            paddingTop: 200,
            paddingBottom: 50,
        },
        component: {
            backgroundColor: color.foreground,
            width: "80%",
            minHeight: 80,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: border.radius.loose,
        },
        centred: {
            alignItems: "center",
        },
        propsContainer: {
            display: "flex",
            flex: 2,
            backgroundColor: color.background,
        },
    });
    return styles;
};
