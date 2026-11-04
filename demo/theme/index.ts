import type { ColorValue } from "react-native";
import {
    type AppThemeFactory,
    createAppTheme,
} from "@reillymc/react-native-components/theme";

export type AppTheme = {
    page: {
        backgroundColor: ColorValue;
        horizontal: number;
        top: number;
        bottom: number;
    };
};

export const createAppThemeValues: AppThemeFactory<AppTheme> = ({
    palette,
}) => ({
    page: {
        backgroundColor: palette.color.background,
        horizontal: palette.spacing.medium,
        top: palette.spacing.medium,
        bottom: 80,
    },
});

export const { AppThemeProvider, defineStyles, useAppTheme, useStyles } =
    createAppTheme<AppTheme>(createAppThemeValues);
