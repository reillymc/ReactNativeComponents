import type { ComponentType, PropsWithChildren } from "react";
// @ts-expect-error react-native-web does not publish types for this internal module.
import { VirtualizedListContextResetter as WebResetter } from "react-native-web/dist/vendor/react-native/VirtualizedList/VirtualizedListContext";

export const VirtualizedListContextResetter =
    WebResetter as ComponentType<PropsWithChildren>;
