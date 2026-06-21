import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../hooks";
import type { ComponentIconAssets } from "../theme";
import { IconBase } from "./icon";

export type RatingIconVariant = "full" | "half" | "empty";
export type RatingIcons = ComponentIconAssets<RatingIconVariant>;

export const valueToRating = (
    rating: number,
    starCount: number,
    scale: number,
): number => (rating / scale) * starCount;

export const ratingToValue = (
    stars: number,
    starCount: number,
    scale: number,
): number => (stars * scale) / starCount;

export const getRatingIcons = (
    rating: number,
    maxRating: number,
): RatingIconVariant[] =>
    [...Array(maxRating)].map((_, i) => {
        if (rating - i >= 1) {
            return "full";
        }

        return rating - i >= 0.5 ? "half" : "empty";
    });

export type RatingStyles = {
    gap: number;
    icon: {
        size: number;
        color: Record<RatingIconVariant, ColorValue>;
    };
};

export interface RatingProps {
    /**
     * Rating Value. Should be between 0 and `maxRating`.
     */
    value?: number;

    /**
     * Total amount of rating icons to display.
     *
     * @default 5
     */
    max?: number;

    /**
     * External rating system scale to base conversion between value and icons
     */
    scale?: number;

    style?: DeepPartial<RatingStyles>;

    /**
     * Custom style for the component.
     */
    containerStyle?: StyleProp<ViewStyle>;
}

export const Rating: FC<RatingProps> = ({
    value = 0,
    max = 5,
    scale,
    style: styleOverrides,
    containerStyle,
}) => {
    const [styles, { style, icons }] = useThemedStyles("rating", createStyles, {
        styles: { rating: styleOverrides },
    });

    const scaledRating = scale ? valueToRating(value, max, scale) : value;

    return (
        <View
            style={[styles.starRating, containerStyle]}
            accessibilityLabel={`star rating. ${scaledRating} of ${max}.`}
        >
            {getRatingIcons(scaledRating, max).map((variant, i) => (
                <IconBase
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                    key={i}
                    {...icons[variant]}
                    style={{
                        size: style.icon.size,
                        color: style.icon.color[variant],
                    }}
                />
            ))}
        </View>
    );
};

const createStyles = ({ styles: { rating } }: ThemedStyles) =>
    StyleSheet.create({
        starRating: {
            flexDirection: "row",
            gap: rating.gap,
        },
    });
