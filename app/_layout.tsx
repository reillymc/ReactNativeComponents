import type React from "react";
import { StrictMode, useEffect, useMemo } from "react";
import { useColorScheme, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// biome-ignore lint/performance/noNamespaceImport: package import convention
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import type { DeepPartial } from "@reillymc/es-utils";
import {
    createDefaultStyles,
    MergeTheme,
    type Theme,
    ThemeProvider,
} from "@reillymc/react-native-components";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

// biome-ignore lint/style/useNamingConvention: expo naming convention
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
    });

    const colorScheme = useColorScheme();
    const { fontScale } = useWindowDimensions();

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    const [theme, styles] = useMemo(() => {
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

        return [theme, createDefaultStyles(theme)];
    }, [colorScheme, fontScale]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <StrictMode>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ThemeProvider theme={theme} styles={styles}>
                    <StatusBar style="auto" />
                    <Stack>
                        <Stack.Screen name="index" />
                        <Stack.Screen
                            name="SelectionModal"
                            options={{
                                presentation: "formSheet",
                                sheetAllowedDetents: [0.5, 1.0],
                                sheetGrabberVisible: true,
                                sheetExpandsWhenScrolledToEdge: true,
                            }}
                        />
                    </Stack>
                </ThemeProvider>
            </GestureHandlerRootView>
        </StrictMode>
    );
};

export default Layout;
