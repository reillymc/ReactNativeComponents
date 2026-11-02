import type { ColorValue } from "react-native";

import type { RatingIconVariant } from "../../../display/rating";
import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTheme } from "../../field";

export type RatingInputTheme = {
    icon: {
        color: Record<RatingIconVariant, ColorValue>;
    };
    surface: FieldTheme["surface"];
};

export const defaultRatingInputTheme: ThemeFactory<"ratingInput"> = ({
    theme,
}) => ({
    icon: {
        color: theme.rating.icon.color,
    },
    surface: { ...theme.field.surface, padding: 0 },
});
