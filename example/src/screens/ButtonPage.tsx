import React from "react";
import { Button, ButtonProps } from "@reillymc/react-native-components";

import { ComponentPage } from "../components";
import { PropDefinitions, PropsPanel } from "../components/PropsPanel";

const defaultProps: ButtonProps = {
    label: "Secondary Button",
    contentAlign: "center",
    variant: "secondary",
    size: "regular",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ButtonProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    contentAlign: {
        type: "array",
        label: "Content alignment",
        values: ["left", "center", "right"],
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
        ],
    },
    size: {
        type: "array",
        label: "Size",
        values: ["small", "regular", "large"],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
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
