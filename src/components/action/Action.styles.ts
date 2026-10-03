import type { Theme } from "../../theme/theme";
import type { ActionStyles } from "./Action";

export const defaultActionStyles = ({ color }: Theme): ActionStyles => ({
    label: {
        color: {
            primary: color.primary,
            secondary: color.foreground,
            destructive: color.destructive,
        },
    },
});
