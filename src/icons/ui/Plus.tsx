import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const Plus: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path
            fill={color}
            d="M7.75 2a.75.75 0 0 1 .75.75V7h4.25a.75.75 0 0 1 0 1.5H8.5v4.25a.75.75 0 0 1-1.5 0V8.5H2.75a.75.75 0 0 1 0-1.5H7V2.75A.75.75 0 0 1 7.75 2Z"
        />
    </Svg>
);
