import type { FC } from "react";

import type { AnchoredContainerProps } from "./AnchoredContainer";
import { InlineMount } from "./InlineMount";
import { OverlayMount } from "./OverlayMount";
import { useAnchoredContainerPosition } from "./useAnchoredContainerPosition";

export const AnchoredContainer: FC<AnchoredContainerProps> = ({
    parentRef,
    anchorRef,
    mount,
    show,
    position,
    theme,
    onInvertedChange,
    style,
    children,
}) => {
    const isInlineMount = mount === "inline" || !anchorRef;
    const measurementRef = isInlineMount ? (anchorRef ?? parentRef) : parentRef;

    const { geometry, inlineStyle, parentMargin, onLayout } =
        useAnchoredContainerPosition({
            parentRef: measurementRef,
            show,
            position,
            theme,
            onInvertedChange,
        });

    if (!show) return null;

    if (isInlineMount || !anchorRef) {
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
