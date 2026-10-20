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
    gap,
    onInvertedChange,
    containerStyle,
    children,
}) => {
    const { geometry, inlineStyle, margin, onLayout } =
        useAnchoredContainerPosition({
            parentRef,
            show,
            position,
            gap,
            onInvertedChange,
        });

    if (!show) return null;

    if (!anchorRef) {
        return (
            <InlineMount
                geometry={geometry}
                style={inlineStyle}
                onLayout={onLayout}
                containerStyle={containerStyle}
            >
                {children}
            </InlineMount>
        );
    }

    return (
        <OverlayMount
            anchorRef={anchorRef}
            geometry={geometry}
            margin={margin}
            onLayout={onLayout}
            containerStyle={containerStyle}
        >
            {children}
        </OverlayMount>
    );
};
