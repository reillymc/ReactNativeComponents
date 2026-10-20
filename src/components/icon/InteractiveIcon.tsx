import type { PressableStateCallbackType } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { IconBase } from "./IconBase";
import type { IconComponentProps } from "./IconComponentProps";
import type { InteractiveIconStyles } from "./InteractiveIcon.styles";

export interface InteractiveIconProps extends PressableStateCallbackType {
    style?: DeepPartial<InteractiveIconStyles>;
    disabled?: boolean;
}

export const InteractiveIcon = <G extends string>({
    pressed,
    style,
    disabled = false,
    ...iconProps
}: InteractiveIconProps & IconComponentProps<G>) => {
    const { interactiveIcon } = useStyles({ interactiveIcon: style });

    return (
        <IconBase
            {...iconProps}
            size={interactiveIcon.size}
            color={
                pressed
                    ? interactiveIcon.color.pressed
                    : interactiveIcon.color[disabled ? "disabled" : "enabled"]
            }
        />
    );
};
