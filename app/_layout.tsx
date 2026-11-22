import { type FC, StrictMode, useEffect } from "react";
import { LogBox, Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
// biome-ignore lint/performance/noNamespaceImport: package import convention
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import {
    darkColorScheme,
    type PaletteOverrides,
    usePalette,
} from "@reillymc/react-native-components/theme";

import { useComponentPageSettings } from "../demo/components/ComponentPageSettingsContext";
import { ComponentPageSettingsProvider } from "../demo/components/ComponentPageSettingsProvider";
import { SelectionModalProvider } from "../demo/components/SelectionModalProvider";
import { SettingsButton } from "../demo/components/SettingsButton";
import { AppThemeProvider } from "../demo/theme";

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

// Reanimated and Gesture Handler use deprecated RN APIs under StrictMode.
// Upstream issues: software-mansion/react-native-reanimated#6997, #3573
LogBox.ignoreLogs([
    "findHostInstance_DEPRECATED is deprecated in StrictMode",
    "findNodeHandle is deprecated in StrictMode",
]);

SplashScreen.preventAutoHideAsync();

const NavigationStack: FC<{ colorScheme: "light" | "dark" }> = ({
    colorScheme,
}) => {
    const palette = usePalette();

    const baseTheme = colorScheme === "dark" ? DarkTheme : DefaultTheme;

    const navigationTheme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: palette.color.primary,
            background: palette.color.background,
            card: palette.color.background,
            text: palette.color.foreground,
            border: palette.color.border,
            notification: palette.color.destructive,
        },
    };

    return (
        <ThemeProvider value={navigationTheme}>
            <SelectionModalProvider>
                <Stack
                    screenOptions={{ headerRight: () => <SettingsButton /> }}
                >
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
                    <Stack.Screen
                        name="SettingsModal"
                        options={{
                            presentation: "formSheet",
                            sheetAllowedDetents: [0.5, 1.0],
                            sheetGrabberVisible: true,
                            sheetExpandsWhenScrolledToEdge: true,
                        }}
                    />
                </Stack>
            </SelectionModalProvider>
        </ThemeProvider>
    );
};

const ThemedRoot: FC = () => {
    const systemColorScheme = useColorScheme();
    const { appearance } = useComponentPageSettings();
    const colorScheme =
        appearance === "system" ? (systemColorScheme ?? "light") : appearance;

    const palette: PaletteOverrides = {
        font: { family: { mono: Font, sans: Font } },
        color: colorScheme === "dark" ? darkColorScheme : undefined,
    };

    return (
        <AppThemeProvider palette={palette}>
            <StatusBar style="auto" />
            <NavigationStack colorScheme={colorScheme} />
        </AppThemeProvider>
    );
};

const Layout: FC = () => {
    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    const [loaded] = useFonts({
        comfortaa: require("../assets/fonts/Comfortaa.ttf"),
    });

    if (Platform.OS === "web" && !loaded) return null;

    return (
        <StrictMode>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <ComponentPageSettingsProvider>
                    <ThemedRoot />
                </ComponentPageSettingsProvider>
            </GestureHandlerRootView>
        </StrictMode>
    );
};

export default Layout;
