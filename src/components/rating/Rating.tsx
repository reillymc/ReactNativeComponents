import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    StyleSheet,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import { type ThemedStyles, useThemedStyles } from "../../hooks";
import type { ComponentIconAssets } from "../../theme";
import { IconBase } from "../icon";
import {
    getRatingIcons,
    type RatingIconVariant,
    valueToRating,
} from "./ratingUtils";

export type RatingIcons = ComponentIconAssets<RatingIconVariant>;

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
                    size={style.icon.size}
                    color={style.icon.color[variant]}
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
