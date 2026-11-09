import type { StyleFactory } from "../../style/styleFactory";
import type { InteractiveTextStyles } from "../text/InteractiveText.styles";

export type ActionVariant = "primary" | "secondary" | "destructive";

export type ActionStyles = {
    label: {
        color: Record<ActionVariant, InteractiveTextStyles["color"]>;
    };
};

export const defaultActionStyles: StyleFactory<ActionStyles> = ({ color }) => ({
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
