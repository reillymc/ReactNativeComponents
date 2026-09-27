import type { Theme } from "../../theme/theme";
import type { InputScaffoldStyles } from "./InputScaffold";

export const defaultInputScaffoldStyles = ({
    color,
    spacing,
}: Theme): InputScaffoldStyles => ({
    gap: spacing.tiny,
    mandatoryIndicator: {
        color: color.primaryDark,
    },
    helpText: {
        gap: spacing.tiny,
    },
});
