import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";

export type InteractiveTextState = "enabled" | "disabled" | "pressed";

export type InteractiveTextStyles = {
    color: {
        [State in InteractiveTextState]: ColorValue;
    };
};

export const defaultInteractiveTextStyles: StyleFactory<
    InteractiveTextStyles
> = ({ color }) => ({
    color: {
        enabled: color.primary,
        pressed: color.primaryLight,
        disabled: color.primaryLight,
    },
});
