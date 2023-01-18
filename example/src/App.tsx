import React from "react";
import { StyleSheet, useColorScheme, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, Theme as NavigationTheme } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
    ThemeProvider,
    createDefaultStyles,
    Styles,
    Theme,
    PortalProvider,
    DeepPartial,
    scaleFont,
    MergeTheme,
} from "@reillymc/react-native-components";

import { ComponentStackNavigator } from "./navigation/ComponentsNavigator";

export const App = () => {
    const [fontsLoaded] = useFonts({
        "Comfortaa-Bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
        "Comfortaa-Light": require("../assets/fonts/Comfortaa-Light.ttf"),
        "Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
        // "anticon": require("react-native-vector-icons/Fonts/AntDesign.ttf"),
    });

    const colorScheme = useColorScheme();
    const { fontScale } = useWindowDimensions();

    if (!fontsLoaded) {
        return null;
    }

    const baseTheme: DeepPartial<Theme> = {
        font: {
            familyWeight: {
                light100: "Comfortaa-Light",
                light200: "Comfortaa-Light",
                regular400: "Comfortaa-Regular",
                bold600: "Comfortaa-Bold",
                bold800: "Comfortaa-Bold",
            },
            size: {
                tiny: scaleFont(12, 0.9, fontScale),
                small: scaleFont(14, 0.88, fontScale),
                regular: scaleFont(16, 0.86, fontScale),
                large: scaleFont(20, 0.84, fontScale),
                xLarge: scaleFont(24, 0.82, fontScale),
                xxLarge: scaleFont(32, 0.8, fontScale),
            },
        },
    };

    const lightTheme = MergeTheme(baseTheme, {});
    const darkTheme = MergeTheme(baseTheme, {
        color: {
            textPrimary: "#fff",
            textSecondary: "#999",
            background: "#000",
            backgroundHighlight: "#20252a",
            backgroundOverlay: "#222",
            foreground: "#1a1818",
            border: "#20252a",
            inputBackground: "#141210",
            inputBackgroundDisabled: "#1a1818",
            inputText: "#fff",
        },
    });

    const theme = colorScheme === "dark" ? darkTheme : lightTheme;

    const defaultStyles = createDefaultStyles(theme);

    const appStyles: Styles = {
        ...defaultStyles,
        button: {
            ...defaultStyles.button,
            fontFamilyWeight: theme.font.familyWeight.regular400,
        },
    };

    const RootStack = createStackNavigator();

    const navigationTheme: NavigationTheme = {
        dark: colorScheme === "dark",
        colors: {
            background: theme.color.background,
            border: theme.color.border,
            card: theme.color.foreground,
            notification: theme.color.primary,
            primary: theme.color.textPrimary,
            text: theme.color.textPrimary,
        },
    };

    return (
        <GestureHandlerRootView style={styles.container}>
            <ThemeProvider theme={theme} styles={appStyles}>
                <StatusBar style="auto" />
                <PortalProvider>
                    <NavigationContainer theme={navigationTheme}>
                        <RootStack.Navigator>
                            <RootStack.Screen
                                name="Examples"
                                options={{ headerShown: false }}
                                component={ComponentStackNavigator}
                            />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </PortalProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
