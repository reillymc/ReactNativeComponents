import type { ThemeFactory } from "../../theme/theme";

export const defaultStateLayerTheme: ThemeFactory<"stateLayer"> = ({
    palette: { color },
}) => ({
    color: color.foreground,
    hoverOpacity: 0.08,
    pressedOpacity: 0.2,
});
