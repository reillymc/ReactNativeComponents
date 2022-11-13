import React from "react";
import { ViewStyle } from "react-native";

import { IconButtonProps } from "../buttons";

export interface SwipeViewProps {
    /**
     * Supports:
     * - `SwipeAction`
     */
    rightActions?: Array<React.ReactNode>;
    containerStyle?: ViewStyle;
    children: React.ReactNode;
}

export interface SwipeActionProps extends Pick<IconButtonProps, "iconName" | "label" | "onPress" | "variant"> {}

export { SwipeView } from "./SwipeView";
export { SwipeAction } from "./SwipeAction";
