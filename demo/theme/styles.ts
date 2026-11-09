import type { DimensionValue } from "react-native";
import type { ThemedStyles } from "@reillymc/react-native-components/hooks";
import type { StyleFactory } from "@reillymc/react-native-components/style";

export type AppStyles = {
    page: {
        horizontal: number;
        top: number;
        bottom: number;
    };
    selection: {
        navigationActionHorizontal: number;
    };
    propsPanel: {
        backgroundColor: string;
        borderRadius: number;
        contentWidth: DimensionValue;
        contentBottomPadding: number;
        itemSpacing: number;
    };
};

export type AppThemedStyles = ThemedStyles<AppStyles>;

export const createAppStyles: StyleFactory<AppStyles> = ({
    border,
    color,
    spacing,
}) => ({
    page: {
        horizontal: spacing.medium,
        top: spacing.medium,
        bottom: 80,
    },
    selection: {
        navigationActionHorizontal: 0,
    },
    propsPanel: {
        backgroundColor: color.foreground,
        borderRadius: border.radius.loose,
        contentWidth: "60%",
        contentBottomPadding: 120,
        itemSpacing: spacing.large,
    },
});
