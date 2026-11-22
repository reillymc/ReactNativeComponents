// biome-ignore-all lint/suspicious/noReactNativeDeepImports: React Native exposes no public API for resetting the inherited ScrollView context.
import type { PropsWithChildren } from "react";
// @ts-expect-error React Native does not publish types for this internal module.
import ScrollViewContext from "react-native/Libraries/Components/ScrollView/ScrollViewContext";

export const ScrollViewContextResetter = ({ children }: PropsWithChildren) => (
    <ScrollViewContext.Provider value={null}>
        {children}
    </ScrollViewContext.Provider>
);
