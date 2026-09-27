import type { Theme } from "../../theme/theme";
import type { ActionStyles } from "./Action";

export const defaultActionStyles = ({ color }: Theme): ActionStyles => ({
    label: {
        color: {
            primary: {
                enabled: color.primary,
                pressed: color.primaryLight,
                disabled: color.primaryLight,
            },
            secondary: {
                enabled: color.secondary,
                pressed: color.secondaryHighlight,
                disabled: color.secondaryHighlight,
            },
            destructive: {
                enabled: color.destructive,
                pressed: color.destructiveHighlight,
                disabled: color.destructiveHighlight,
            },
        },
    },
});
