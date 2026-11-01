import type { ThemeFactory } from "../../../theme/theme";

export type SelectionInputTheme = {
    selectionContainer: {
        gap: number;
    };
};

export const defaultSelectionInputTheme: ThemeFactory<"selectionInput"> = ({
    palette,
}) => ({
    selectionContainer: {
        gap: palette.spacing.tiny,
    },
});
