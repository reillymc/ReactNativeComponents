import { type FC, type PropsWithChildren, useState } from "react";
import { Appearance, Platform } from "react-native";

import {
    type AppearancePreference,
    ComponentPageSettingsContext,
} from "./ComponentPageSettingsContext";

export const ComponentPageSettingsProvider: FC<PropsWithChildren> = ({
    children,
}) => {
    const [surfaceBackground, setSurfaceBackground] = useState(true);
    const [appearance, setAppearanceState] =
        useState<AppearancePreference>("system");

    const setAppearance = (value: AppearancePreference) => {
        setAppearanceState(value);

        if (Platform.OS === "web") return;

        Appearance.setColorScheme(value === "system" ? "unspecified" : value);
    };

    return (
        <ComponentPageSettingsContext.Provider
            value={{
                surfaceBackground,
                setSurfaceBackground,
                appearance,
                setAppearance,
            }}
        >
            {children}
        </ComponentPageSettingsContext.Provider>
    );
};
