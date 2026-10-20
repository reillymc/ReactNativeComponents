import type { IconSet } from "../../icons/base";

export interface IconComponentProps<G extends string> {
    iconSet: IconSet<G>;
    iconName: G;
}
