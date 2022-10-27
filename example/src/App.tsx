import React from "react";
import { StyleSheet } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import {
    ThemeProvider,
    createDefaultStyles,
    DefaultTheme,
    Styles,
    Theme,
    PortalProvider,
} from "@reillymc/react-native-components";

import { ComponentStackNavigator } from "./navigation/ComponentsNavigator";

export default function App() {
    const [fontsLoaded] = useFonts({
        "Comfortaa-Bold": require("../assets/fonts/Comfortaa-Bold.ttf"),
        "Comfortaa-Light": require("../assets/fonts/Comfortaa-Light.ttf"),
        "Comfortaa-Regular": require("../assets/fonts/Comfortaa-Regular.ttf"),
        // "anticon": require("react-native-vector-icons/Fonts/AntDesign.ttf"),
    });

    if (!fontsLoaded) {
        return null;
    }

    const appTheme: Theme = {
        ...DefaultTheme,
        font: {
            ...DefaultTheme.font,
            familyWeight: {
                light100: "Comfortaa-Light",
                light200: "Comfortaa-Light",
                regular400: "Comfortaa-Regular",
                bold600: "Comfortaa-Bold",
                bold800: "Comfortaa-Bold",
            },
        },
    };

    const defaultStyles = createDefaultStyles(appTheme);

    const appStyles: Styles = {
        ...defaultStyles,
        button: {
            ...defaultStyles.button,
            fontFamilyWeight: appTheme.font.familyWeight.regular400,
        },
    };

    // const createStyles: CreateStyles = theme => ({
    //     ...defaultStyles,
    // });

    const RootStack = createStackNavigator();

    return (
        <GestureHandlerRootView style={styles.container}>
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
    },
});
