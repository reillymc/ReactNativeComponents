import React from "react";
import {
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";

const propDefinitions: PropDefinitions<ToggleInputProps> = {
    label: {
        type: "string",
        label: "Label",
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
        ],
    },
    iconVariant: {
        type: "enum",
        label: "Icon variant",
        default: "Dot",
        values: [
            { label: "Check", value: "check" },
            { label: "Dot", value: "dot" },
        ],
    },
    size: {
        type: "enum",
        label: "Size",
        default: "Regular",
        values: [
            { label: "Small", value: "small" },
            { label: "Medium", value: "medium" },
        ],
    },
    helpText: {
        type: "string",
        label: "Help text",
    },
    onChange: {
        type: "function",
        label: "Change action",
    },
};

const defaultProps: ToggleInputProps = {
    disabled: false,
    onChange: () => null,
    variant: "primary",
    label: "Toggle input label",
};

const ToggleInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<ToggleInputProps>(defaultProps);

    const [toggled, setToggled] = React.useState(false);

    return (
        <ComponentPage
            componentName="Toggle Input"
            component={
                <ToggleInput {...props} onChange={setToggled} value={toggled} />
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

export default ToggleInputPage;
