import type { IconSet } from "../../icons";

export interface IconComponentProps<G extends string> {
    iconSet: IconSet<G>;
    iconName: G;
}
