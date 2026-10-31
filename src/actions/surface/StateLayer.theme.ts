import type { ThemeFactory } from "../../theme/theme";

export const defaultStateLayerTheme: ThemeFactory<"stateLayer"> = ({
    palette,
}) => ({
    color: palette.color.foreground,
});
