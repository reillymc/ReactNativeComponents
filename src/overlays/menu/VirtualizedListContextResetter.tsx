import type { ComponentType, PropsWithChildren } from "react";
// @ts-expect-error React Native does not publish types for this internal module.
import { VirtualizedListContextResetter as NativeResetter } from "react-native/Libraries/Lists/VirtualizedListContext";

export const VirtualizedListContextResetter =
    NativeResetter as ComponentType<PropsWithChildren>;
