import type { Theme } from "../../theme/theme";
import type { IconBaseStyles } from "./IconBase";

export const defaultIconBaseStyles = ({ color }: Theme): IconBaseStyles => ({
    color: color.foreground,
    size: 20,
});
