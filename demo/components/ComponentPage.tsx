import type { FunctionComponent, ReactNode } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { usePalette } from "@reillymc/react-native-components/theme";

import { defineStyles, useStyles } from "../theme";

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
    const palette = usePalette();
    const styles = useStyles(createStyles);

    return (
        <>
            <Stack.Screen
                options={{
                    title: componentName,
                    headerLargeTitle: true,
                    headerLargeTitleShadowVisible: false,
                    headerLargeTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontWeight: "800",
                    },
                    headerBackTitleStyle: {
                        fontFamily: palette.font.family.sans,
                        fontSize: palette.font.size.regular,
                    },
                    headerLargeStyle: {
                        backgroundColor: palette.color.background,
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
            {!!propsPanel && (
                <View style={styles.propsContainer}>{propsPanel}</View>
            )}
        </>
    );
};

ComponentPage.displayName = "ComponentPage";

const createStyles = defineStyles(({ palette: { color, border } }) => ({
    componentContainer: {
        flexGrow: 1,
        flexBasis: 1,
        backgroundColor: color.background,
        paddingTop: 160,
        paddingBottom: 60,
    },
    component: {
        flex: 1,
        backgroundColor: color.surface,
        width: "90%",
        minHeight: 80,
        justifyContent: "center",
        alignItems: "center",
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
}));
