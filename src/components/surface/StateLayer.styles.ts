import type { Theme } from "../../theme/theme";
import type { StateLayerStyles } from "./StateLayer";

export const defaultStateLayerStyles = ({
    color,
}: Theme): StateLayerStyles => ({
    color: color.foreground,
    hoverOpacity: 0.08,
    pressedOpacity: 0.1,
});
