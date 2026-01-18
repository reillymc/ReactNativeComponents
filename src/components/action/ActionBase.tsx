import type { FC } from "react";
import { Pressable, type PressableProps } from "react-native";

export interface ActionBaseProps
    extends Pick<PressableProps, "children" | "hitSlop"> {
    containerStyle?: PressableProps["style"];
    disabled?: boolean;
    onPress?: () => void;
}

export const ActionBase: FC<ActionBaseProps> = ({
    disabled: disabledProp,
    containerStyle,
    hitSlop = 16,
    children,
    onPress,
}) => (
    <Pressable
        hitSlop={hitSlop}
        disabled={disabledProp || !onPress}
        onPress={onPress}
        style={containerStyle}
    >
        {children}
    </Pressable>
);
