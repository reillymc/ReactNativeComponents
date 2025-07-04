import type { FC } from "react";
import { Pressable, type PressableProps } from "react-native";

export interface ActionBaseProps extends Pick<PressableProps, "children"> {
    containerStyle?: PressableProps["style"];
    disabled?: boolean;
    onPress?: () => void;
}

export const ActionBase: FC<ActionBaseProps> = ({
    disabled: disabledProp,
    containerStyle,
    children,
    onPress,
}) => (
    <Pressable
        hitSlop={20}
        disabled={disabledProp || !onPress}
        onPress={onPress}
        style={containerStyle}
    >
        {children}
    </Pressable>
);
