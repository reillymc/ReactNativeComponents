import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const StarFull: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 24 24" width={size}>
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path d="M0 0h24v24H0z" fill="none" />
        <Path
            fill={color}
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
    </Svg>
);
