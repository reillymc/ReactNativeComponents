import type { FC } from "react";
import type { ColorValue } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { Text } from "../text";
import { ActionBase, type ActionBaseProps } from "./ActionBase";
import { StateTint } from "./StateTint";

export type ActionVariant = "primary" | "secondary" | "destructive";

export type ActionStyles = {
    label: {
        color: Record<ActionVariant, ColorValue>;
    };
};

export interface ActionProps
    extends Pick<ActionBaseProps, "containerStyle" | "disabled" | "onPress"> {
    label: string;
    variant?: ActionVariant;
    style?: DeepPartial<ActionStyles>;
}

export const Action: FC<ActionProps> = ({
    label,
    variant = "secondary",
    disabled: disabledProp,
    style,
    containerStyle,
    onPress,
}) => {
    const disabled = disabledProp || !onPress;
    const { action } = useStyles({ action: style });

    return (
        <ActionBase
            disabled={disabled}
            onPress={onPress}
            containerStyle={containerStyle}
        >
            {(state) => (
                <StateTint {...state}>
                    <Text
                        numberOfLines={1}
                        style={{ color: action.label.color[variant] }}
                    >
                        {label}
                    </Text>
                </StateTint>
            )}
        </ActionBase>
    );
};

Action.displayName = "Action";
