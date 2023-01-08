import React from "react";
import { Button, CollapsibleContainer, CollapsibleContainerProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";

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

export const CollapsibleContainerPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<CollapsibleContainerProps>(defaultProps);

    return (
        <ComponentPage
            componentName="CollapsibleContainer"
            component={
                <CollapsibleContainer style={{ backgroundColor: "indianred" }} {...props} collapsed={false}>
                    <Button label="Example container content" size="small" />
                </CollapsibleContainer>
            }
            propsPanel={
                <PropsPanel
                    propValues={props}
                    propDefinitions={propDefinitions}
                    onChange={(propId, value) => setProps(prev => ({ ...prev, [propId]: value }))}
                />
            }
        />
    );
};
