import {
    type ComponentPropsWithRef,
    type FC,
    type ReactNode,
    useState,
} from "react";
import { Pressable } from "react-native";

export type PressableBaseState = {
    pressed: boolean;
    hovered: boolean;
};

export type PressableBaseProps = Omit<
    ComponentPropsWithRef<typeof Pressable>,
    "children"
> & {
    children?: ReactNode | ((state: PressableBaseState) => ReactNode);
};

export const PressableBase: FC<PressableBaseProps> = ({
    children,
    onHoverIn,
    onHoverOut,
    ...props
}) => {
    const [hovered, setHovered] = useState(false);

    return (
        <Pressable
            {...props}
            onHoverIn={(event) => {
                setHovered(true);
                onHoverIn?.(event);
            }}
            onHoverOut={(event) => {
                setHovered(false);
                onHoverOut?.(event);
            }}
        >
            {(state) =>
                typeof children === "function"
                    ? children({ ...state, hovered })
                    : children
            }
        </Pressable>
    );
};
