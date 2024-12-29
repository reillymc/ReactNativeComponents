/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import { ThemeContextDefinition } from "../providers";

import { MergeStyles } from "../theme";
import type { StyleOverrides } from "../theme/styles";
import { useTheme } from "./useTheme";

export { ThemeContextDefinition as ThemedStyles };

export type Generator<T extends Record<string, any>, U extends Record<string, any> | undefined> = (
    theme: ThemeContextDefinition,
    componentProps: U,
) => T;

export const useThemedStyles = <T extends Record<string, any>, U extends Record<string, any> | undefined>(
    generator: Generator<T, U>,
    componentProps: U,
) => {
    const theme = useTheme();

    const themedStyles = React.useMemo(() => generator(theme, componentProps), [generator, theme, componentProps]);

    return themedStyles;
};

export const useThemedStylesWithOverride = <T extends Record<string, any>, U extends Record<string, any> | undefined>(
    generator: Generator<T, U>,
    componentStyles: StyleOverrides,
    componentProps: U,
) => {
    const { theme, styles: originalStyles } = useTheme();

    const themedStyles = React.useMemo(() => {
        const styles = MergeStyles(originalStyles, componentStyles);
        return [generator({ theme, styles }, componentProps), styles] as const;
    }, [generator, theme, componentProps]);

    return themedStyles;
};
