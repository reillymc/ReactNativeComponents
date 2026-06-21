import type React from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import {
    type ThemedStyles,
    useTheme,
    useThemedStyles,
} from "@reillymc/react-native-components";

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
                    headerLargeTitleStyle: {
                        fontFamily: theme.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: theme.font.family.sans,
                        fontSize: theme.font.size.regular,
                    },
                    headerLargeStyle: {
                        backgroundColor: theme.color.background,
                    },
                }}
            />
            <View
                style={[
                    styles.componentContainer,
                    fullscreen ? undefined : styles.centred,
                ]}
            >
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
            flexGrow: 1,
            flexBasis: 1,
            backgroundColor: color.background,
            paddingTop: 160,
            paddingBottom: 60,
        },
        component: {
            flex: 1,
            backgroundColor: color.foreground,
            width: "90%",
            minHeight: 80,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: border.radius.loose,
            padding: 12,
        },
        centred: {
            alignItems: "center",
        },
        propsContainer: {
            display: "flex",
            flexGrow: 5,
            flexBasis: 1,
            backgroundColor: color.background,
        },
    });
    return styles;
};
