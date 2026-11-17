import type { FunctionComponent } from "react";
import { Button } from "@reillymc/react-native-components/actions";
import {
    CollapsiblePanel,
    type CollapsiblePanelProps,
} from "@reillymc/react-native-components/layout";

import {
    ComponentPage,
    enumPropDefinition,
    type PropDefinitions,
    PropsPanel,
    useComponentProps,
} from "../demo/components";

const propDefinitions: PropDefinitions<CollapsiblePanelProps> = {
    collapsed: {
        type: "boolean",
        label: "Collapsed",
        default: false,
    },
    header: enumPropDefinition({
        label: "Header",
        default: "button",
        values: [
            { label: "None", value: undefined, id: "none" },
            {
                label: "Button",
                value: <Button label="Collapsible panel header" />,
                id: "button",
            },
        ],
    }),
    children: enumPropDefinition({
        label: "Children",
        default: "button",
        values: [
            { label: "None", value: undefined, id: "none" },
            {
                label: "Button",
                value: <Button label="Collapsible panel children" />,
                id: "button",
            },
        ],
    }),
};

const CollapsiblePanelPage: FunctionComponent = () => {
    const { props, onChange } = useComponentProps(propDefinitions);

    return (
        <ComponentPage
            componentName="Collapsible Panel"
            component={
                <CollapsiblePanel
                    {...props}
                    style={{ backgroundColor: "white", marginHorizontal: 16 }}
                />
            }
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

export default CollapsiblePanelPage;
