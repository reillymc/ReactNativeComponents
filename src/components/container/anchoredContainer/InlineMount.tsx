import type { FC } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";

import type { MountProps } from "./AnchoredContainer";
import { getContainerPlacement } from "./helpers";

export type InlineMountProps = MountProps & {
    style: StyleProp<ViewStyle>;
};

export const InlineMount: FC<InlineMountProps> = ({
    geometry,
    style,
    onLayout,
    containerStyle,
    children,
}) => (
    <View onLayout={onLayout} style={[style, containerStyle]}>
        {typeof children === "function"
            ? children(getContainerPlacement(geometry))
            : children}
    </View>
);
