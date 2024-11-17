import { IconButton, Text, ThemedStyles, useTheme, useThemedStyles } from "@reillymc/react-native-components";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

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

    const [showModal, setShowModal] = React.useState(!fullscreen);

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
            <Animated.View
                layout={Layout.springify()}
                style={[styles.componentContainer, fullscreen ? undefined : styles.centred]}
            >
                {component}
            </Animated.View>
            {!showModal && (
                <IconButton
                    iconName="chevron-up"
                    onPress={() => setShowModal(prev => !prev)}
                    style={styles.showModalButton}
                />
            )}
            <Animated.View layout={Layout.springify()} />

            <View style={styles.propsContainer}>
                <Text variant="display" style={styles.heading}>
                    {componentName}
                </Text>
                {propsPanel}
            </View>
        </>
    );
};

ComponentPage.displayName = "ComponentPage";

const createStyles = ({ theme: { color } }: ThemedStyles) => {
    const styles = StyleSheet.create({
        componentContainer: {
            flex: 2,
            paddingTop: 200,
            backgroundColor: color.background,
        },

        centred: {
            alignItems: "center",
        },
        propsContainer: {
            display: "flex",
            flex: 4,
        },
        heading: {
            marginLeft: 16,
            marginBottom: 8,
        },
        showModalButton: {
            position: "absolute",
            bottom: 40,
            right: 40,
        },
    });
    return styles;
};
