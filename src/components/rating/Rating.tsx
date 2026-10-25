import type { FC } from "react";
import {
    type ColorValue,
    type StyleProp,
    View,
    type ViewStyle,
} from "react-native";
import type { DeepPartial } from "@reillymc/es-utils";

import type { ComponentIconAssets } from "../../icons/componentIconAssets";
import { IconBase } from "../icon";
import { defineStyles, useComponent } from "../shared";
import {
    getRatingIcons,
    type RatingIconVariant,
    valueToRating,
} from "./ratingUtils";

export type RatingIcons = ComponentIconAssets<RatingIconVariant>;

export type RatingTheme = {
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

    theme?: DeepPartial<RatingTheme>;

    /**
     * Custom style for the component.
     */
    style?: StyleProp<ViewStyle>;
}

export const Rating: FC<RatingProps> = ({
    value = 0,
    max = 5,
    scale,
    theme: themeOverrides,
    style,
}) => {
    const { styles, theme, icons } = useComponent("rating", {
        themeOverrides,
        createStyles,
    });

    const scaledRating = scale ? valueToRating(value, max, scale) : value;

    return (
        <View
            style={[styles.starRating, style]}
            accessibilityLabel={`star rating. ${scaledRating} of ${max}.`}
        >
            {getRatingIcons(scaledRating, max).map((variant, i) => (
                <IconBase
                    // biome-ignore lint/suspicious/noArrayIndexKey: index is the only available key
                    key={i}
                    {...icons[variant]}
                    size={theme.icon.size}
                    color={theme.icon.color[variant]}
                />
            ))}
        </View>
    );
};

const createStyles = defineStyles((theme: RatingTheme) => ({
    starRating: {
        flexDirection: "row",
        gap: theme.gap,
    },
}));
