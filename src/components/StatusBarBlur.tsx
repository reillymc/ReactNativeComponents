import React from "react";
import { NativeEventEmitter, NativeModules, Platform, StatusBar, useColorScheme } from "react-native";
import { BlurView, BlurViewProps } from "expo-blur";

export interface StatusBarBlurProps extends Pick<BlurViewProps, "intensity"> {}

export const StatusBarBlur: React.FC<StatusBarBlurProps> = ({ intensity = 85 }) => {
    const colorScheme = useColorScheme();

    const height = useStatusBarHeight();

    return (
        <BlurView
            intensity={intensity}
            tint={colorScheme === "dark" ? "dark" : "light"}
            style={{ height, position: "absolute", top: 0, left: 0, width: "100%", zIndex: 10 }}
        />
    );
};

StatusBarBlur.displayName = "StatusBarBlur";

export const useStatusBarHeight = () => {
    const [value, setValue] = React.useState(StatusBar.currentHeight || 0);

    React.useEffect(() => {
        if (Platform.OS !== "ios") {
            return;
        }

        const emitter = new NativeEventEmitter(NativeModules.StatusBarManager);

        NativeModules.StatusBarManager.getHeight(({ height }: { height: number }) => {
            setValue(height);
        });
        const listener = emitter.addListener("statusBarFrameWillChange", data => setValue(data.frame.height));

        return () => listener.remove();
    }, []);

    return value;
};
