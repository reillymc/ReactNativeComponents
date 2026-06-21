import React from "react";
import {
    type IconBaseDefaultProps,
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components";

import { ComponentPage, type PropDefinitions, PropsPanel } from "../components";
import { CommonInputProps, glyphMapValueItems } from "../helpers";

type Props = IconBaseDefaultProps & ToggleInputProps;

const propDefinitions: PropDefinitions<Props> = {
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
    iconName: {
        type: "enum",
        label: "Icon Name",
        values: glyphMapValueItems,
    },
    onChange: {
        type: "function",
        label: "Change action",
    },
};

const defaultProps: Props = {
    disabled: false,
    onChange: () => null,
    toggleVariant: "primary",
    label: "Toggle input label",
    iconName: "check",
};

const ToggleInputPage: React.FunctionComponent = () => {
    const [props, setProps] = React.useState<Props>(defaultProps);

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
