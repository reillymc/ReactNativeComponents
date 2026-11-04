import { type FunctionComponent, useState } from "react";
import {
    Badge,
    type BadgeProps,
} from "@reillymc/react-native-components/display";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: BadgeProps = {
    label: "8",
    variant: "primary",
};

const propDefinitions: PropDefinitions<BadgeProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    variant: {
        type: "enum",
        label: "Variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
        ],
    },
};

const BadgePage: FunctionComponent = () => {
    const [props, setProps] = useState<BadgeProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Badge"
            component={<Badge {...props} />}
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) =>
                        setProps((prev) => ({ ...prev, [propId]: value }))
                    }
                />
            }
        />
    );
};

export default BadgePage;
