import type { DeepPartial } from "@reillymc/es-utils";
import { MergeTheme, Styles, Theme, ThemeProvider, createDefaultStyles } from "@reillymc/react-native-components";
import { useFonts } from "expo-font";
import { Stack } from "expo-router/stack";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ComponentScreens } from "./index";

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
                tiny: 12 * fontScale,
                small: 14 * fontScale,
                regular: 16 * fontScale,
                large: 18 * fontScale,
                xLarge: 24 * fontScale,
                xxLarge: 32 * fontScale,
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
                <Stack initialRouteName="index">
                    <Stack.Screen
                        name="selectionModal"
                        options={{
                            presentation: "formSheet",
                            sheetAllowedDetents: [0.5, 1.0],
                            sheetGrabberVisible: true,
                            sheetExpandsWhenScrolledToEdge: true,
                        }}
                    />
                    {Object.values(ComponentScreens).map(screen => (
                        <Stack.Screen key={screen.page} name={screen.page} />
                    ))}
                </Stack>
            </ThemeProvider>
        </GestureHandlerRootView>
    );
};

export default Layout;
