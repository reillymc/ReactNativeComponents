import type { ThemeFactory } from "../../theme/theme";

export const defaultStateTintTheme: ThemeFactory<"stateTint"> = () => ({
    hoverOpacity: 0.92,
    pressedOpacity: 0.8,
});
