import type { Theme } from "../../theme/theme";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { RatingStyles } from "./Rating";

export const defaultRatingStyles = (theme: Theme): RatingStyles => ({
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
