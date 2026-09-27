import React from "react";
import {
    Button,
    CollapsibleContainer,
    type CollapsibleContainerProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";

const defaultProps: CollapsibleContainerProps = {
    collapsed: false,
};

const propDefinitions: PropDefinitions<CollapsibleContainerProps> = {
    collapsed: {
        type: "boolean",
        label: "Collapsed",
    },
    direction: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Down", value: "down" },
            { label: "Up", value: "up" },
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
        ],
    },
};

const CollapsibleContainerPage: React.FunctionComponent = () => {
    const [props, setProps] =
        React.useState<CollapsibleContainerProps>(defaultProps);

    return (
        <ComponentPage
            componentName="CollapsibleContainer"
            component={
                <CollapsibleContainer
                    style={{ backgroundColor: "indianred" }}
                    {...props}
                    collapsed={false}
                >
                    <Button label="Example container content" />
                </CollapsibleContainer>
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

export default CollapsibleContainerPage;
