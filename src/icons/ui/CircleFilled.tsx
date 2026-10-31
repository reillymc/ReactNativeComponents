import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const CircleFilled: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path fill={color} d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Z" />
    </Svg>
);
