export type RatingIconVariant = "full" | "half" | "empty";

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
