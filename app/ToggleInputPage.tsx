import React from "react";
import {
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { CommonInputProps } from "../helpers";

const propDefinitions: PropDefinitions<ToggleInputProps> = {
    ...CommonInputProps,
    toggleVariant: {
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
    onChange: {
        type: "function",
        label: "Change action",
    },
};

const defaultProps: ToggleInputProps = {
    disabled: false,
    onChange: () => null,
    toggleVariant: "primary",
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
