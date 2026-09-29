// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const Dash: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path
            fill={color}
            d="M2 7.75A.75.75 0 0 1 2.75 7h10a.75.75 0 0 1 0 1.5h-10A.75.75 0 0 1 2 7.75Z"
        />
    </Svg>
);
