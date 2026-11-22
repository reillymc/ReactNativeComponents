import type { FunctionComponent } from "react";
import {
    Badge,
    type BadgeProps,
} from "@reillymc/react-native-components/display";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";
import { ContentPropDefinitions } from "../demo/helpers";

const propDefinitions: PropDefinitions<BadgeProps> = {
    label: {
        ...ContentPropDefinitions.label,
        default: "",
    },
    variant: enumPropDefinition({
        label: "Variant",
        default: "primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    }),
};

const BadgePage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Badge"
            component={<Badge {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={onChange}
                />
            }
        />
    );
};

export default BadgePage;
