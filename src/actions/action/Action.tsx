import type { FC } from "react";
import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../../internal";
import { Text } from "../../typography/text";
import { ActionBase, type ActionBaseProps } from "./ActionBase";
import { StateTint } from "./StateTint";

export type ActionVariant = "primary" | "secondary" | "destructive";

export type ActionTheme = {
    label: {
        color: Record<ActionVariant, ColorValue>;
    };
};

export interface ActionProps
    extends Pick<
        ActionBaseProps,
        "style" | "disabled" | "highlighted" | "onPress"
    > {
    label: string;
    variant?: ActionVariant;
    theme?: DeepPartial<ActionTheme>;
}

export const Action: FC<ActionProps> = ({
    label,
    variant = "secondary",
    theme: themeOverrides,
    ...baseProps
}) => {
    const { theme } = useComponent("action", { themeOverrides });

    return (
        <ActionBase {...baseProps}>
            {(state) => (
                <StateTint {...state}>
                    <Text
                        numberOfLines={1}
                        theme={{ color: theme.label.color[variant] }}
                    >
                        {label}
                    </Text>
                </StateTint>
            )}
        </ActionBase>
    );
};

Action.displayName = "Action";
