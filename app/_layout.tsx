import type React from "react";
import { StrictMode, useEffect, useMemo } from "react";
import { Platform, useColorScheme, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// biome-ignore lint/performance/noNamespaceImport: package import convention
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import type { DeepPartial } from "@reillymc/es-utils";
import { ThemeProvider } from "@reillymc/react-native-components/providers";
import {
    createDefaultStyles,
    MergeTheme,
    type Theme,
} from "@reillymc/react-native-components/theme";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

const Font = "Comfortaa" as const;

// biome-ignore lint/style/useComponentExportOnlyModules lint/style/useNamingConvention: expo-router requires the `unstable_settings` export and its naming convention.
export const unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "index",
};

SplashScreen.preventAutoHideAsync();

const Layout: React.FC = () => {
    const colorScheme = useColorScheme();
    const { fontScale } = useWindowDimensions();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    const [theme, styles] = useMemo(() => {
        const baseTheme: DeepPartial<Theme> = {
            font: {
                family: {
                    mono: Font,
                    sans: Font,
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

    if (Platform.OS === "web") {
        // biome-ignore lint/correctness/useHookAtTopLevel: this condition won't change during runtime
        const [loaded] = useFonts({
            comfortaa: require("../assets/fonts/Comfortaa.ttf"),
        });

        if (!loaded) return null;
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
