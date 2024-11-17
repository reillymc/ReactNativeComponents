import {
    DeepPartial,
    MergeTheme,
    Styles,
    Theme,
    ThemeProvider,
    createDefaultStyles,
    scaleFont,
} from "@reillymc/react-native-components";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

const Layout: React.FC = () => {
    const [fontsLoaded] = useFonts({
        "Comfortaa-Bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
        "Comfortaa-Light": require("../assets/fonts/Comfortaa-Light.ttf"),
        "Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
        // "anticon": require("react-native-vector-icons/Fonts/AntDesign.ttf"),
    });

    const colorScheme = useColorScheme();
    const { fontScale } = useWindowDimensions();

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

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

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={theme} styles={appStyles}>
                <StatusBar style="auto" />
                <Stack initialRouteName="index" />
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

export default Layout;
