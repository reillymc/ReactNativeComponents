import type { FC } from "react";

import type { AnchoredContainerProps } from "./AnchoredContainer";
import { InlineMount } from "./InlineMount";
import { OverlayMount } from "./OverlayMount";
import { useAnchoredContainerPosition } from "./useAnchoredContainerPosition";

export const AnchoredContainer: FC<AnchoredContainerProps> = ({
    parentRef,
    anchorRef,
    show,
    position,
    theme,
    onInvertedChange,
    style,
    children,
}) => {
    const { geometry, inlineStyle, parentMargin, onLayout } =
        useAnchoredContainerPosition({
            parentRef,
            show,
            position,
            theme,
            onInvertedChange,
        });

    if (!show) return null;

    if (!anchorRef) {
        return (
            <InlineMount
                geometry={geometry}
                containerStyle={inlineStyle}
                onLayout={onLayout}
                style={style}
            >
                {children}
            </InlineMount>
        );
    }

    return (
        <OverlayMount
            anchorRef={anchorRef}
            geometry={geometry}
            margin={parentMargin}
            onLayout={onLayout}
            style={style}
        >
            {children}
        </OverlayMount>
    );
};
