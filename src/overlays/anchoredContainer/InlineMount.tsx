import type { FC } from "react";
import { type StyleProp, View, type ViewStyle } from "react-native";

import type { MountProps } from "./AnchoredContainer";
import { getContainerPlacement } from "./helpers";

export type InlineMountProps = MountProps & {
    containerStyle: StyleProp<ViewStyle>;
    style?: StyleProp<ViewStyle>;
};

export const InlineMount: FC<InlineMountProps> = ({
    geometry,
    containerStyle,
    onLayout,
    style,
    children,
}) => (
    <View onLayout={onLayout} style={[containerStyle, style]}>
        {typeof children === "function"
            ? children(getContainerPlacement(geometry))
            : children}
    </View>
);
