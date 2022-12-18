import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Theme, useTheme } from "@reillymc/react-native-components";

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

    const styles = createStyles(theme);
    return (
        <View style={styles.container}>
            <View style={[styles.componentContainer, fullscreen ? undefined : styles.centred]}>{component}</View>
            {!fullscreen && (
                <View style={styles.propsContainer}>
                    <Text variant="title" style={styles.heading}>
                        {componentName}
                    </Text>
                    {propsPanel}
                </View>
            )}
        </View>
    );
};

ComponentPage.displayName = "ComponentPage";

const createStyles = (theme: Theme) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.color.background,
        },
        componentContainer: {
            flex: 2,
            paddingTop: 60,
        },
        centred: {
            alignItems: "center",
            justifyContent: "center",
        },
        propsContainer: {
            display: "flex",
            flex: 4,
        },
        heading: {
            marginLeft: 16,
        },
    });
