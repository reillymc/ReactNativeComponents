// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const Exclamation: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path
            fill={color}
            d="M8 11a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 11ZM8 1a1.5 1.5 0 0 1 1.5 1.5v6a1.5 1.5 0 0 1-3 0v-6A1.5 1.5 0 0 1 8 1Z"
        />
    </Svg>
);
