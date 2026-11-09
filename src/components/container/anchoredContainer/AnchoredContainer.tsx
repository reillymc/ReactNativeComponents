import type { FC, ReactNode, RefObject } from "react";
import type {
    LayoutChangeEvent,
    StyleProp,
    TextInput,
    View,
    ViewStyle,
} from "react-native";
import type { AnimatedRef } from "react-native-reanimated";

import { InlineMount } from "./InlineMount";
import { useAnchoredContainerPosition } from "./useAnchoredContainerPosition";

export type ContainerGeometry = {
    parentY: number;
    parentHeight: number;
    offsetY: number;
    contentHeight: number;
    inverted: boolean;
    visibleAreaHeight: number;
    maxHeight: number;
    parentX?: number;
    parentWidth?: number;
};

/**
 * Public surface exposed to the container's render prop.
 */
export type ContainerPlacement = {
    inverted: boolean;
    maxHeight: number;
};

export type AnchoredContainerChildren =
    | ReactNode
    | ((placement: ContainerPlacement) => ReactNode);

export type MountProps = {
    geometry: ContainerGeometry | undefined;
    onLayout: (event: LayoutChangeEvent) => void;
    children: AnchoredContainerChildren;
    containerStyle?: StyleProp<ViewStyle>;
};

export interface AnchoredContainerProps {
    parentRef: RefObject<TextInput | null>;

    /**
     * Animated ref to the anchor view. Used by the iOS overlay mount to keep
     * the container attached while scrolling. When omitted, iOS falls back to the
     * in-tree inline mount.
     */
    anchorRef?: AnimatedRef<View>;

    show?: boolean;
    position?: "auto" | "above";
    gap?: number;
    onInvertedChange?: (inverted: boolean) => void;
    children?: AnchoredContainerChildren;
    containerStyle?: StyleProp<ViewStyle>;
}

export const AnchoredContainer: FC<AnchoredContainerProps> = ({
    parentRef,
    show,
    position,
    gap,
    onInvertedChange,
    containerStyle,
    children,
}) => {
    const { geometry, inlineStyle, onLayout } = useAnchoredContainerPosition({
        parentRef,
        show,
        position,
        gap,
        onInvertedChange,
    });

    if (!show) return null;

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
};
