import { type FC, StrictMode, useEffect } from "react";
import { Platform, useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
// biome-ignore lint/performance/noNamespaceImport: package import convention
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@reillymc/react-native-components/providers";
import {
    createStyles,
    createTheme,
    darkPalette,
} from "@reillymc/react-native-components/theme";

import { SelectionModalProvider } from "../demo/components/SelectionModalProvider";
import { createAppTheme } from "../demo/theme";

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

const Layout: FC = () => {
    const colorScheme = useColorScheme();

    useEffect(() => {
        SplashScreen.hideAsync();
    }, []);

    const theme = createTheme(
        {
            font: { family: { mono: Font, sans: Font } },
            color: colorScheme === "dark" ? darkPalette : undefined,
        },
        createAppTheme,
    );

    const styles = createStyles(theme);

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
                    <SelectionModalProvider>
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
                    </SelectionModalProvider>
                </ThemeProvider>
            </GestureHandlerRootView>
        </StrictMode>
    );
};

export default Layout;
