import BottomSheet from "@gorhom/bottom-sheet";
import { Portal } from "@gorhom/portal";
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
    const [modalHeight, setModalHeight] = React.useState(2);

    const styles = useThemedStyles(createStyles, { modalHeight });

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
            <Animated.View style={styles.bottomPadding} layout={Layout.springify()} />

            <Portal>
                <BottomSheet
                    onChange={setModalHeight}
                    snapPoints={["12%", "40%", "60%"]}
                    index={showModal ? 2 : -1}
                    keyboardBehavior="extend"
                >
                    <View style={styles.propsContainer}>
                        <Text variant="display" style={styles.heading}>
                            {componentName}
                        </Text>
                        {propsPanel}
                    </View>
                </BottomSheet>
            </Portal>
        </>
    );
};

ComponentPage.displayName = "ComponentPage";

const createStyles = ({ theme: { color } }: ThemedStyles, { modalHeight }: { modalHeight: number }) => {
    const styles = StyleSheet.create({
        componentContainer: {
            flex: 2,
            paddingTop: 200,
            backgroundColor: color.background,
        },
        bottomPadding: {
            flex: modalHeight,
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
