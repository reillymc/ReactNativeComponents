import { createDefaultFocusRing } from "../../internal/focusRing";
import type { ThemeFactory } from "../../theme/theme";

export const defaultActionBaseTheme: ThemeFactory<"actionBase"> = ({
    palette,
}) => ({
    disabledOpacity: 0.5,
    focusRing: createDefaultFocusRing(palette),
});
