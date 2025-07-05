import type { FC } from "react";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStylesWithOverride } from "../../hooks";
import { InteractiveText, type InteractiveTextStyles } from "../text";
import { ActionBase, type ActionBaseProps } from "./ActionBase";

export type ActionState = "default" | "disabled" | "pressed";
export type ActionVariant = "primary" | "secondary" | "destructive";

export type ActionStyles = {
    label: InteractiveTextStyles;
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
    const { action } = useStylesWithOverride({ action: style });

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
                    variant={variant}
                    style={action.label}
                >
                    {label}
                </InteractiveText>
            )}
        </ActionBase>
    );
};

Action.displayName = "Action";
