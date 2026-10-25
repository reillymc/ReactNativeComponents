import type { ThemeFactory } from "../../theme/theme";
import { createDefaultFocusRing } from "../shared/focusRing";

export const defaultActionBaseTheme: ThemeFactory<"actionBase"> = ({
    palette,
}) => ({
    disabledOpacity: 0.5,
    focusRing: createDefaultFocusRing(palette),
});
