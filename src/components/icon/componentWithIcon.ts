import type { ReactNode } from "react";

import type { IconSet } from "../../icons";

export interface IconComponentProps<G extends string> {
    iconSet: IconSet<G>;
    iconName: G;
}

export const withIcon = <P extends object>(
    component: <G extends string>(
        props: P & IconComponentProps<G>,
    ) => ReactNode,
) => component;
