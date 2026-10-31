import type { ColorValue } from "react-native";

import type { RatingIconVariant } from "../../../display/rating";
import type { ThemeFactory } from "../../../theme/theme";

export type RatingInputTheme = {
    icon: {
        color: Record<RatingIconVariant, ColorValue>;
    };
};

export const defaultRatingInputTheme: ThemeFactory<"ratingInput"> = ({
    theme,
}) => ({
    icon: {
        color: theme.rating.icon.color,
    },
});
