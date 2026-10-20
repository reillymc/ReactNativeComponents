// Glyph path data derived from GitHub Octicons (https://github.com/primer/octicons),
// MIT licensed. See THIRD_PARTY_NOTICES.md.

import { type FC, useId } from "react";
import Svg, { ClipPath, Defs, Path, Rect } from "react-native-svg";

import type { IconSetItemProps } from "../base";

export const StarHalf: FC<IconSetItemProps> = ({ size, color }) => {
    const clipId = useId();

    return (
        <Svg height={size} viewBox="0 0 16 16" width={size}>
            <Defs>
                <ClipPath id={clipId}>
                    <Rect height="16" width="8" x="0" y="0" />
                </ClipPath>
            </Defs>
            <Path
                fill={color}
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Zm0 2.445L6.615 5.5a.75.75 0 0 1-.564.41l-3.097.45 2.24 2.184a.75.75 0 0 1 .216.664l-.528 3.084 2.769-1.456a.75.75 0 0 1 .698 0l2.77 1.456-.53-3.084a.75.75 0 0 1 .216-.664l2.24-2.183-3.096-.45a.75.75 0 0 1-.564-.41L8 2.694Z"
            />
            <Path
                clipPath={`url(#${clipId})`}
                fill={color}
                d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"
            />
        </Svg>
    );
};
