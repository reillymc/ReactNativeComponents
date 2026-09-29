// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const ChevronDown: FC<IconSetItemProps> = ({ size, color }) => (
    <Svg height={size} viewBox="0 0 16 16" width={size}>
        <Path
            fill={color}
            d="M12.78 5.22a.749.749 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.06 0L3.22 6.28a.749.749 0 1 1 1.06-1.06L8 8.939l3.72-3.719a.749.749 0 0 1 1.06 0Z"
        />
    </Svg>
);
