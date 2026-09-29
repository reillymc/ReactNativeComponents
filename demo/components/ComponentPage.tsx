import type { FunctionComponent, ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { useThemedStyles } from "@reillymc/react-native-components/hooks";

import { type AppThemedStyles, useTheme } from "../theme";

export interface ComponentPageProps {
    componentName?: string;
    component: ReactNode;
    propsPanel?: ReactNode;
    fullscreen?: boolean;
}

export const ComponentPage: FunctionComponent<ComponentPageProps> = ({
    component,
    componentName,
    propsPanel,
    fullscreen,
}) => {
    const { theme } = useTheme();

    const styles = useThemedStyles(createStyles);

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

const createStyles = ({ theme: { color, border } }: AppThemedStyles) =>
    StyleSheet.create({
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
