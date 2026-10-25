import type { FC } from "react";
import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useComponent } from "../shared";
import { Text } from "../text";
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
    disabled: disabledProp,
    theme: themeOverrides,
    onPress,
    ...baseProps
}) => {
    const disabled = disabledProp || !onPress;
    const { theme } = useComponent("action", { themeOverrides });

    return (
        <ActionBase disabled={disabled} onPress={onPress} {...baseProps}>
            {(state) => (
                <StateTint {...state}>
                    <Text
                        numberOfLines={1}
                        style={{ color: theme.label.color[variant] }}
                    >
                        {label}
                    </Text>
                </StateTint>
            )}
        </ActionBase>
    );
};

Action.displayName = "Action";
