import { createContext, use } from "react";

export type AppearancePreference = "light" | "dark" | "system";

export interface ComponentPageSettings {
    surfaceBackground: boolean;
    setSurfaceBackground: (value: boolean) => void;
    appearance: AppearancePreference;
    setAppearance: (value: AppearancePreference) => void;
}

export const ComponentPageSettingsContext = createContext<
    ComponentPageSettings | undefined
>(undefined);

export const useComponentPageSettings = () => {
    const context = use(ComponentPageSettingsContext);

    if (!context) {
        throw new Error(
            "useComponentPageSettings must be used within a ComponentPageSettingsProvider",
        );
    }

    return context;
};
