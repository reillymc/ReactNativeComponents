import type { PressableStateCallbackType } from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { useStyles } from "../../hooks";
import { withIcon } from "./componentWithIcon";
import { IconBase, type IconBaseStyles } from "./IconBase";

export type InteractiveIconState = "enabled" | "disabled" | "pressed";

export type InteractiveIconStyles = {
    size: IconBaseStyles["size"];
    color: {
        [State in InteractiveIconState]: IconBaseStyles["color"];
    };
};

export interface InteractiveIconProps extends PressableStateCallbackType {
    style?: DeepPartial<InteractiveIconStyles>;
    disabled?: boolean;
}

export const InteractiveIcon = withIcon<InteractiveIconProps>(
    ({ pressed, style, disabled = false, ...iconProps }) => {
        const { interactiveIcon } = useStyles({
            interactiveIcon: style,
        });

        return (
            <IconBase
                {...iconProps}
                style={{
                    size: interactiveIcon.size,
                    color: pressed
                        ? interactiveIcon.color.pressed
                        : interactiveIcon.color[
                              disabled ? "disabled" : "enabled"
                          ],
                }}
            />
        );
    },
);
