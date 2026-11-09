import type { ColorValue } from "react-native";

import type { StyleFactory } from "../../style/styleFactory";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { RatingIconVariant } from "./ratingUtils";

export type RatingStyles = {
    gap: number;
    icon: {
        size: number;
        color: Record<RatingIconVariant, ColorValue>;
    };
};

export const defaultRatingStyles: StyleFactory<RatingStyles> = (theme) => ({
    gap: theme.spacing.tiny,
    icon: {
        color: {
            empty: theme.color.primaryLight,
            half: theme.color.primary,
            full: theme.color.primary,
        },
        size: defaultIconStyles(theme).size.large,
    },
});
