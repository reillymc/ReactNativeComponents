import React from "react";
import { ToggleInput, ToggleInputProps } from "@reillymc/react-native-components";

import { ComponentPage, PropDefinitions, PropsPanel } from "../components";
import { glyphMapValueItemsNullable } from "../helpers";

const propDefinitions: PropDefinitions<ToggleInputProps> = {
    iconName: {
        type: "enum",
        label: "Icon Name",
        default: "check",
        values: glyphMapValueItemsNullable,
    },
    onChange: {
        type: "function",
        label: "Change action",
    },
    disabled: {
        type: "boolean",
        label: "Disabled",
    },
    variant: {
        type: "enum",
        label: "Style variant",
        default: "Primary",
        values: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Flat", value: "flat" },
        ],
    },
    size: {
        type: "enum",
        label: "Size",
        default: "Regular",
        values: [
            { label: "Small", value: "small" },
            { label: "Regular", value: "regular" },
            { label: "Large", value: "large" },
        ],
    },
};

const defaultProps: ToggleInputProps = {
    iconName: "check",
    disabled: false,
    onChange: () => null,
    variant: "primary",
};

export const ToggleInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ToggleInputProps>(defaultProps);

    const [toggled, setToggled] = React.useState(false);

    return (
        <ComponentPage
            componentName="Toggle Input"
            component={<ToggleInput {...props} onChange={setToggled} value={toggled} />}
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
