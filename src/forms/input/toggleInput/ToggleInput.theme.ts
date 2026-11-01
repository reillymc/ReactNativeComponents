import type { ToggleIndicatorTheme } from "../../../display/toggleIndicator";
import type { ThemeFactory } from "../../../theme/theme";

export type ToggleInputTheme = {
    indicator: ToggleIndicatorTheme;
    label: {
        gap: number;
    };
};

export const defaultToggleInputTheme: ThemeFactory<"toggleInput"> = ({
    palette,
    theme,
}) => ({
    indicator: theme.toggleIndicator,
    label: {
        gap: palette.spacing.small,
    },
});
