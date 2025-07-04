import React from "react";
import {
    Button,
    Panel,
    type PanelProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const defaultProps: PanelProps = {
    collapsed: false,
    header: <Button label="Panel header" />,
    children: <Button label="Panel children" />,
};

const propDefinitions: PropDefinitions<PanelProps> = {
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
                value: <Button label="Panel header" />,
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
                value: <Button label="Panel children" />,
                id: "button",
            },
        ],
    },
};

const PanelPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<PanelProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Panel"
            component={
                <Panel
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

export default PanelPage;
