import type { IconSet } from "./base";

export interface IconComponentProps<G extends string> {
    iconSet: IconSet<G>;
    iconName: G;
}
