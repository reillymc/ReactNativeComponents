import React from "react";

import { ThemeContextDefinition } from "../providers";
import { useTheme } from "./useTheme";

export { ThemeContextDefinition as ThemedStyles };

export type Generator<T extends {}, U extends {} | undefined> = (theme: ThemeContextDefinition, componentProps: U) => T;

export const useThemedStyles = <T extends {}, U extends {} | undefined>(
    generator: Generator<T, U>,
    componentProps: U,
) => {
    const theme = useTheme();

    const themedStyles = React.useMemo(() => generator(theme, componentProps), [generator, theme, componentProps]);

    return themedStyles;
};
