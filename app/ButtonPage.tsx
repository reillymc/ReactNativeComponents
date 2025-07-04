import React from "react";
import { Button, type ButtonProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

export const defaultProps: ButtonProps = {
    label: "Secondary Button",
    variant: "secondary",
    size: "regular",
    onPress: () => null,
};

const propDefinitions: PropDefinitions<ButtonProps> = {
    label: {
        type: "string",
        label: "Label",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Secondary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Destructive", value: "destructive" },
        ],
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    size: {
        type: "enum",
        label: "Size",
        default: "Regular",
        values: [
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    },
    onPress: {
        type: "function",
        label: "Press action",
    },
};

const ButtonPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ButtonProps>(defaultProps);

    return (
        <ComponentPage
            componentName="Button"
            component={<Button {...props} />}
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

export default ButtonPage;
