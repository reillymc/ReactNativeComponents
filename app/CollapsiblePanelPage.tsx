import { type FunctionComponent, useState } from "react";
import { Button } from "@reillymc/react-native-components/actions";
import {
    CollapsiblePanel,
    type CollapsiblePanelProps,
} from "@reillymc/react-native-components/layout";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: CollapsiblePanelProps = {
    collapsed: false,
    header: <Button label="Collapsible panel header" />,
    children: <Button label="Collapsible panel children" />,
};

const propDefinitions: PropDefinitions<CollapsiblePanelProps> = {
    collapsed: {
        type: "boolean",
        label: "Collapsed",
    },
    header: {
        type: "enum",
        label: "Header",
        default: "dark",
        values: [
            { label: "None", value: undefined, id: "none" },
            {
                label: "Button",
                value: <Button label="Collapsible panel header" />,
                id: "button",
            },
        ],
    },
    children: {
        type: "enum",
        label: "Children",
        default: "dark",
        values: [
            { label: "None", value: undefined, id: "none" },
            {
                label: "Button",
                value: <Button label="Collapsible panel children" />,
                id: "button",
            },
        ],
    },
};

const CollapsiblePanelPage: FunctionComponent = () => {
    const [props, setProps] = useState<CollapsiblePanelProps>(defaultProps);

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
                    onChange={(propId, value) =>
                        setProps((prev) => ({ ...prev, [propId]: value }))
                    }
                />
            }
        />
    );
};

export default CollapsiblePanelPage;
