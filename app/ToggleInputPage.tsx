import React from "react";
import {
    Octicons,
    type OcticonsIconName,
} from "@react-native-vector-icons/octicons";
import {
    type IconComponentProps,
    ToggleInput,
    type ToggleInputProps,
} from "@reillymc/react-native-components/components";

import {
    ComponentPage,
    type PropDefinitions,
    PropsPanel,
} from "../demo/components";
import { CommonInputProps, glyphMapValueItems } from "../demo/helpers";

type Props = IconComponentProps<OcticonsIconName> & ToggleInputProps;

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
    iconSet: {
        type: "hidden",
    },
};

const defaultProps: Props = {
    iconSet: Octicons,
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
