import type { FC, ReactNode } from "react";
import {
    Pressable,
    type PressableProps,
    type StyleProp,
    type ViewStyle,
} from "react-native";

import { useTheme } from "../../hooks";

export type ActionState = {
    pressed: boolean;
    hovered?: boolean;
};

export type ActionBaseStyles = {
    disabledOpacity: number;
};

export interface ActionBaseProps extends Pick<PressableProps, "hitSlop"> {
    containerStyle?: StyleProp<ViewStyle>;
    disabled?: boolean;
    onPress?: () => void;
    children?: ReactNode | ((state: ActionState) => ReactNode);
}

export const ActionBase: FC<ActionBaseProps> = ({
    disabled,
    containerStyle,
    hitSlop = 16,
    children,
    onPress,
}) => {
    const {
        styles: { actionBase },
    } = useTheme();

    return (
        <Pressable
            hitSlop={hitSlop}
            disabled={disabled || !onPress}
            onPress={onPress}
            style={[
                disabled && { opacity: actionBase.disabledOpacity },
                { overflow: "hidden" },
                containerStyle,
            ]}
        >
            {(state) =>
                typeof children === "function" ? children(state) : children
            }
        </Pressable>
    );
};
