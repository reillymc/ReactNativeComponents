import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { IconComponentProps } from "../icon";
import { useComponent } from "../shared";
import { IconActionBase, type IconActionBaseProps } from "./IconActionBase";

export type IconActionVariant = "primary" | "secondary" | "destructive";

export type IconActionTheme = {
    color: Record<IconActionVariant, ColorValue>;
};

export interface IconActionProps extends Omit<IconActionBaseProps, "theme"> {
    variant?: IconActionVariant;
    theme?: DeepPartial<IconActionTheme>;
}

export const IconAction = <G extends string>({
    variant = "secondary",
    theme: themeOverrides,
    ...props
}: IconActionProps & IconComponentProps<G>) => {
    const { theme } = useComponent("iconAction", { themeOverrides });

    return (
        <IconActionBase {...props} theme={{ color: theme.color[variant] }} />
    );
};
