import type { ReactNode } from "react";
import type { OcticonsIconName } from "@react-native-vector-icons/octicons";

import type { IconComponent } from "../../theme";

export interface IconBaseDefaultProps {
    iconSet?: never;
    iconName: OcticonsIconName;
}

export interface IconBaseCustomProps<G extends string> {
    iconSet: IconComponent<Record<G, number | string>>;
    iconName: G;
}

export type IconComponentProps<G extends string> =
    | IconBaseDefaultProps
    | IconBaseCustomProps<G>;

export const componentWithIcon = <P extends object>(
    component: <G extends string>(
        props: P & IconComponentProps<G>,
    ) => ReactNode,
) => component;
