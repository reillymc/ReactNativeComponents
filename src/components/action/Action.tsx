import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { InteractiveText } from "../text";
import type { ActionStyles, ActionVariant } from "./Action.styles";
import { ActionBase, type ActionBaseProps } from "./ActionBase";

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
            {(pressableState) => (
                <InteractiveText
                    {...pressableState}
                    disabled={disabled}
                    style={{ color: action.label.color[variant] }}
                >
                    {label}
                </InteractiveText>
            )}
        </ActionBase>
    );
};

Action.displayName = "Action";
