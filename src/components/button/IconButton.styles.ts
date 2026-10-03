import type { Theme } from "../../theme/theme";
import { defaultIconStyles } from "../icon/Icon.styles";
import type { IconButtonStyles } from "./IconButton";

export const defaultIconButtonStyles = (theme: Theme): IconButtonStyles => {
    const { color, spacing } = theme;
    const icon = defaultIconStyles(theme);

    return {
        container: {
            size: icon.size.medium + spacing.small,
        },
        appearance: {
            prominent: {
                container: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
                content: {
                    primary: color.primaryForeground,
                    destructive: color.destructiveForeground,
                },
            },
            subtle: {
                container: color.inset,
                content: {
                    primary: color.primary,
                    destructive: color.destructive,
                },
            },
        },
    };
};
