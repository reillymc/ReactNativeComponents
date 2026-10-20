import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export interface InputScaffoldStyles {
    gap: number;
    mandatoryIndicator: {
        color: ColorValue;
    };
    helpText: {
        gap: number;
    };
}

export const defaultInputScaffoldStyles: StyleFactory<InputScaffoldStyles> = ({
    color,
    spacing,
}) => ({
    gap: spacing.tiny,
    mandatoryIndicator: {
        color: color.primaryDark,
    },
    helpText: {
        gap: spacing.tiny,
    },
});
