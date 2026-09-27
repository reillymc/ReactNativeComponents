import React from "react";
import { Button, type ButtonProps } from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const defaultProps: ButtonProps = {
    label: "Secondary Button",
    variant: "secondary",
    width: "auto",
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
    width: {
        type: "enum",
        label: "Width",
        values: [
            { label: "Auto", value: "auto" },
            { label: "Medium", value: "medium" },
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
