import React from "react";
import { Button, ButtonProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const propDefinitions: PropDefinitions<ButtonProps> = {
    label: {
        label: "Label",
        type: "string",
    },
    contentAlign: {
        label: "Content alignment",
        type: "array",
        values: ["left", "center", "right"],
    },
    variant: {
        label: "Style variant",
        type: "string",
    },
    size: {
        label: "Size",
        type: "array",
        values: ["small", "medium", "large"],
    },
    onPress: {
        label: "Press action",
        type: "function",
    },
};

const defaultProps: ButtonProps = {
    label: "Secondary Button",
    contentAlign: "center",
    variant: "secondary",
    size: "medium",
    onPress: () => null,
};

export const ButtonPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Button"
            component={<Button {...props} />}
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
