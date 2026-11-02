import type { ThemeFactory } from "../../../theme/theme";
import type { FieldTheme } from "../../field";

export type SelectionInputTheme = {
    selectionContainer: {
        gap: number;
    };
    surface: FieldTheme["surface"];
};

export const defaultSelectionInputTheme: ThemeFactory<"selectionInput"> = ({
    palette,
    theme,
}) => ({
    selectionContainer: {
        gap: palette.spacing.tiny,
    },
    surface: { ...theme.field.surface, padding: 0 },
});
