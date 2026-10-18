import {
    type ThemedStyles,
    useTheme as useBaseTheme,
} from "@reillymc/react-native-components/hooks";

import type { AppTheme } from "./types";

export type AppThemedStyles = ThemedStyles<AppTheme>;

export const useTheme = () => useBaseTheme<AppTheme>();
