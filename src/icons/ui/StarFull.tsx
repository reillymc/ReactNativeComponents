// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const StarFull: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path
            fill={color}
            d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
        />
    </Svg>
);
