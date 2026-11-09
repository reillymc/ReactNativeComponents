import type { FC, ReactNode } from "react";

import { ActionBase, type ActionBaseProps } from "../action";
import { StateLayer } from "./StateLayer";

export interface InteractionSurfaceProps
    extends Pick<
        ActionBaseProps,
        | "style"
        | "disabled"
        | "highlighted"
        | "onPress"
        | "hitSlop"
        | "tabIndex"
        | "accessibilityLabel"
        | "role"
        | "onFocus"
        | "onBlur"
    > {
    children?: ReactNode;
}

export const InteractionSurface: FC<InteractionSurfaceProps> = ({
    children,
    ...props
}) => (
    <ActionBase {...props}>
        {(state) => (
            <>
                <StateLayer {...state} />
                {children}
            </>
        )}
    </ActionBase>
);
