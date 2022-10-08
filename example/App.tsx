import "react-native-gesture-handler";

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

import { ThemeProvider } from "@reillymc/react-native-components";

import { createDefaultStyles, DefaultTheme, Styles, Theme } from "../src/components/ThemeProvider";
import { ComponentStackNavigator } from "./navigation/ComponentsNavigator";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Comfortaa-Bold": require("./assets/fonts/Comfortaa-Bold.ttf"),
        "Comfortaa-Light": require("./assets/fonts/Comfortaa-Light.ttf"),
        "Comfortaa-Regular": require("./assets/fonts/Comfortaa-Regular.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const appTheme: Theme = {
        ...DefaultTheme,
        font: {
            ...DefaultTheme.font,
            regular: "Comfortaa-Regular",
            bold: "Comfortaa-Bold",
            light: "Comfortaa-Light",
        },
    };

    const defaultStyles = createDefaultStyles(appTheme);

    const appStyles: Styles = {
        ...defaultStyles,
        button: {
            ...defaultStyles.button,
            fontFamilyWeight: appTheme.font.bold,
        },
    };

    // const createStyles: CreateStyles = theme => ({
    //     ...defaultStyles,
    // });

    const RootStack = createStackNavigator();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider theme={appTheme} styles={appStyles}>
                <StatusBar style="auto" />
                <PortalProvider>
                    <NavigationContainer>
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
